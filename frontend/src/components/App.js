import React from 'react';
// import ReactDOM from 'react-dom';
import {
    Redirect,
    Route,
    Switch,
    useHistory,
  } from "react-router-dom";

/* import components */
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'




import api from '../utils/api.js'
import auth from '../utils/auth.js'
import { currentUserContext } from '../contexts/CurrentUserContext';


function App() {

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
    const [isInfoTooltipPopupSuccessed, setIsInfoTooltipPopupSuccessed] = React.useState(true);

    const history = useHistory();

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

    React.useEffect(() => {
        function closeByEscape(evt) {
          if(evt.key === 'Escape') {
            closeAllPopups();
          }
        }
        if(isOpen) {
          document.addEventListener('keydown', closeByEscape);
          return () => {
            document.removeEventListener('keydown', closeByEscape);
          }
        }
      }, [isOpen]);

    

    const handleEditAvatarClick = (event) => {
        setIsEditAvatarPopupOpen(true)
    }

    const handleEditProfileClick = (event) => {
        setIsEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick =  (event) => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    const handleRegister = (email, password) => {      
        
        auth.signUp(email, password)
            .then( (res) => {
                setIsInfoTooltipPopupSuccessed(true);
                setIsInfoTooltipPopupOpen(true);
                history.push('/sign-in');                
            } )
            .catch((err) => {
                setIsInfoTooltipPopupSuccessed(false);
                setIsInfoTooltipPopupOpen(true)
                console.log(`????????????.....: ${err}`)
            })
    }

    const handleLogin = (email, password) => {
        auth.signIn(email, password)
            .then( (res) => {
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(`????????????.....: ${err}`)
            })
    }

    // ???????????????? ????????????
    React.useEffect(() => {
        auth.checkToken()
            .then((res) => {
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(`????????????.....: ${err}`)
            })

    }, []);

    // logout
    const onLogout = () => {
        auth.logout()
            .then(()=>{
                setLoggedIn(false);
            })
            .catch((err) => {
                console.log(`????????????.....: ${err}`)
            });
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsConfirmPopupOpen(false)
        setIsImagePopupOpen(false)
        setIsInfoTooltipPopupOpen(false);
    };

    const handleUpdateUser = (user) => {
        api.updateProfileInfo(user)
            .then( (result) => {
                setCurrentUser(result);
                closeAllPopups();
            })
            .catch(err => console.log(`????????????.....: ${err}`));
    }

    const handleUpdateAvatar = ({avatar}) => {
        
        api.updateAvatar(avatar)
            .then( (res) => {
                setCurrentUser({
                    ...currentUser,
                    avatar
                })
                closeAllPopups();
            })
            .catch(err => console.log(`????????????.....: ${err}`));
    }

    const handleAddPlaceSubmit = (cardData) => {
        api.addCard(cardData)
            .then( (newCard) => {
                setCards([newCard, ...cards]); 
                closeAllPopups();
            })
            .catch(err => console.log(`????????????.....: ${err}`));
    };

    React.useEffect(() => {
        if (loggedIn) {
            api.getProfileInfo()
                .then((profileData) => {
                    setCurrentUser(profileData)
                })
                .catch(err => console.log(`????????????.....: ${err}`));
            
            api.getCards()
                .then((cardList) => {
                    setCards(cardList);
                })
                .catch(err => console.log(`????????????.....: ${err}`));

            history.push('/');
        }

    }, [loggedIn]);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i === currentUser._id);

        if (isLiked) {
            api.unlike(card._id)
                .then( (newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.log(`????????????.....: ${err}`));
        } else {
            api.like(card._id)
                .then( (newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.log(`????????????.....: ${err}`));
        }
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then( () => {
                setCards(
                    cards.slice().filter( (c) => c._id !== card._id )
                )
            })
            .catch(err => console.log(`????????????.....: ${err}`));
    }

    return (


        <currentUserContext.Provider value={currentUser}>
            <Header
                loggedIn={loggedIn}
                userEmail={userEmail}
                handleLogout={onLogout}
            />
            <Switch>
                <Route path="/sign-up">
                    <Register onRegister={handleRegister} />
                </Route>

                <Route path="/sign-in">
                    <Login onLogin={handleLogin} />
                </Route>

                <ProtectedRoute exact path="/"
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onEditAvatar = {handleEditAvatarClick}
                    onCardClick = {handleCardClick}
                    cards = {cards}
                    onCardLike = {handleCardLike}
                    onCardDelete = {handleCardDelete}
                    loggedIn = {loggedIn}
                    component={Main}
                />

                <Route exact path="*">
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up"/>}
                </Route>
            </Switch>
            <Footer />
                        
           

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />
    
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup 
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <PopupWithForm name="confirm" title="???? ?????????????? ?" isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
            <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard}/>

            <InfoTooltip isOpen = {isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={isInfoTooltipPopupSuccessed} />          

        </currentUserContext.Provider>





       
    );
}

export default App;
