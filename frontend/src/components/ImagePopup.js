import React from 'react';

function ImagePopup({isOpen, onClose, card}) {
    return (
        <div className={`popup popup_prefix_image images-full ${isOpen ? 'popup_visible' : ''}`}>            
            <div className="images-full__content">
                <button className="popup__close images-full__close" type="button" title="Закрыть" onClick={onClose}></button>
                <img
                    src={card.link}
                    alt={card.name}
                    className="images-full__img" />
                <p className="images-full__text">{card.name}</p>
            </div>
        </div>
    );
}


export default ImagePopup;