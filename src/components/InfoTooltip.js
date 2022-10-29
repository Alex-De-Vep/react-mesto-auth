import React from "react";

function InfoToolTip({isSuccess, isOpen, onClose}) {
    const message = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

    return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_tooltip">
                <button className="popup__close" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
                <div className={`popup__icon ${isSuccess ? 'popup__icon_success' : 'popup__icon_error'}`}></div>
                <h2 className="popup__title">{message}</h2>
            </div>
        </div>
    );
}

export default InfoToolTip;