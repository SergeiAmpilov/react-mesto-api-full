const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { checkSignIn, checkSignUp } = require('./middlewares/celebrate');
const { processError, notFoundRequest } = require('./middlewares/error');
const corsEnable = require('./functions/cors-enable');
const { crashTest } = require('./functions/crash-test');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cookieParser());
app.use(cors(corsEnable));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', crashTest);

app.post('/signin', checkSignIn, login);
app.post('/signup', checkSignUp, createUser);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', notFoundRequest);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate
app.use(processError);

app.listen(PORT, () => {});
