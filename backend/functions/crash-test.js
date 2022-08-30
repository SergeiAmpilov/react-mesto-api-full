module.exports.crashTest = () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
};
