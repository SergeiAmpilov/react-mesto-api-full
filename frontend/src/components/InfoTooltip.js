import React from 'react';

import errorImg from '../images/Error.png';
import successImg from '../images/Success.png';





function InfoTooltip({ isOpen, onClose, isSuccess }) {
    return (
        <div className={`popup popup_prefix_infotooltip ${isOpen ? 'popup_visible' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" title="Закрыть" onClick={onClose}></button>
                <img
                    src={isSuccess ? successImg : errorImg}
                    className="info-tooltip__img" />
                <p className="info-tooltip__text">
                    {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
                
                
            </div>
        </div>
    );
}

export default InfoTooltip;