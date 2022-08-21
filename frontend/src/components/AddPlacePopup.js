import React from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    
    const [formValues, setFormValues] = React.useState({ name: "", link: "" });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
    }

    const handleCardAddSubmit = (evt) => {
        evt.preventDefault();
        onAddPlace(formValues);
    }

    React.useEffect(() => {
        setFormValues({ name: "", link: "" });
      }, [isOpen]);

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleCardAddSubmit} >
                <label className="popup__form-group">
                    <input type="text"
                        name="name"
                        id="place-input"
                        placeholder="Название"
                        className="popup__form-field popup__form-field_field_name"
                        minLength="2"
                        maxLength="30"
                        value={formValues.name}
                        onChange={handleChange}
                        required />
                    <span className="popup__error-text place-input-error">Сообщение об ошибке</span>
                </label>
                <label className="popup__form-group">
                    <input type="url"
                        name="link"
                        id="url-input"
                        placeholder="Ссылка на картинку"
                        className="popup__form-field popup__form-field_field_url"
                        value={formValues.link}
                        onChange={handleChange}
                        required />
                    <span className="popup__error-text url-input-error">Сообщение об ошибке</span>
                </label>
        </PopupWithForm>
    );

}

export default AddPlacePopup;