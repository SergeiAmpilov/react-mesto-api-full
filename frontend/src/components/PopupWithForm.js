import React from 'react';

function PopupWithForm({ name, isOpen, onClose, title, children, onSubmit}) {

    return (
        
        <div className={`popup popup_prefix_${name} ${isOpen ? 'popup_visible' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" title="Закрыть" onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                <form className='popup__form' name={name} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__button-submit">Да</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;