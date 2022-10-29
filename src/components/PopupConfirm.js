import React from "react";

function PopupConfirm({onSubmit, card, isOpen, onClose}) {
    function handleSubmit(e) {
        e.preventDefault();

        onSubmit(card);
    }

    return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">Вы уверены?</h2>
                <button className="popup__close" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
                <form className="popup__form" name="remove-form" onSubmit={handleSubmit} noValidate>
                    <button type="submit" className="popup__button">Да</button>
                </form>
            </div>
        </div>
    );
}

export default PopupConfirm;