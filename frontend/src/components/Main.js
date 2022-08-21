import React from 'react';

import Card from './Card'
import api from '../utils/api.js'

import { currentUserContext } from '../contexts/CurrentUserContext';


function Main({
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete }) {

    const [isEditButtonHovered, setIsEditButtonHovered] = React.useState(false);

    const cardsElements = cards.map( el => <Card 
        element={el}
        key={el._id}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        /> )

    const currentUser = React.useContext(currentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar-group">
                        <img
                            src={currentUser.avatar}
                            alt="Логотип пользователя"
                            className="profile__avatar"
                            onMouseOver={ () => setIsEditButtonHovered(true)}
                            />
                        <button
                            title="Загрузить новый аватар"
                            className="profile__avatar-button"
                            onClick={onEditAvatar}
                            onMouseOut={ () => setIsEditButtonHovered(false) }
                            style={{
                                visibility: isEditButtonHovered ? 'visible' : 'hidden' 
                            }}
                            ></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <p className="profile__subtitle">{currentUser.about}</p>
                        <button className="profile__pen" type="button" title="Редактировать" onClick={onEditProfile}></button>
                    </div>
                </div>
                <button className="profile__add-button" type="button" title="Добавить" onClick={onAddPlace}></button>
            </section>
            <section>
                <ul className="elements">
                    { cardsElements }
                </ul>
            </section>
        </main>
    );
}

export default Main;