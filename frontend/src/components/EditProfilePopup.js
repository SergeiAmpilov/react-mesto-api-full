import React from 'react';
import PopupWithForm from './PopupWithForm'
import { currentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    // name и description
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(currentUserContext);

    const handleNameChange = (evt) => setName(evt.target.value);
    const handleDescriptionChange = (evt) => setDescription(evt.target.value);
    const handleSubmit = (evt) => {
        evt.preventDefault();

        onUpdateUser({
            name,
            about: description,
          });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        }, [currentUser, isOpen]); 

    return (
        <PopupWithForm
            name="title"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            >
                <label className="popup__form-group">
                    <input type="text"
                        name="name"
                        placeholder="Имя"
                        className="popup__form-field popup__form-field_field_name"
                        value={name ?? ""}
                        onChange={handleNameChange}
                        required 
                        minLength="2"
                        maxLength="40"
                        id="name-input"
                    />
                    <span className="popup__error-text name-input-error">Сообщение об ошибке</span>
                </label>
                <label className="popup__form-group">
                    <input type="text"
                        name="position"
                        placeholder="Должность"
                        className="popup__form-field popup__form-field_field_position"
                        value={description ?? ""}
                        onChange={handleDescriptionChange}
                        required
                        minLength="2"
                        maxLength="200"
                        id="position-input" />
                    <span className="popup__error-text position-input-error">Сообщение об ошибке</span>
                </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;