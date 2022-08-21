import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const inputRef = React.useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value,
          })
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} >
                <label className="popup__form-group">
                    <input
                        type="url"
                        name="url"
                        id="avatar-input"
                        placeholder="Ссылка на картинку"
                        className="popup__form-field popup__form-field_field_url"
                        ref={inputRef}
                        
                        required
                        />
                    <span className="popup__error-text avatar-input-error">Сообщение об ошибке</span>
                </label>
        </PopupWithForm>
    );

}

export default EditAvatarPopup;