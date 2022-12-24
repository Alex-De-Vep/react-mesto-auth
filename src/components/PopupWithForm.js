import React from 'react';

function PopupWithForm({title, formName, onSubmit, submitButton, isOpen, onClose, children}) {
    React.useEffect(() => {
        if (!isOpen) return;
        const handleEscapeClose = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleEscapeClose);
        return () => {
            document.removeEventListener("keydown", handleEscapeClose)
        };
    }, [isOpen, onClose])

    const HandleOverlayClose = (event) => {
        if (event.target === event.currentTarget && isOpen) {
            onClose();
        }
    }

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onMouseDown={HandleOverlayClose}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <button className="popup__close" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
                <form className="popup__form" name={formName} onSubmit={onSubmit} noValidate>
                    {children}
                    <button type="submit" className="popup__button">{submitButton}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
