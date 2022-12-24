import React from 'react';

function ImagePopup({card, onClose}) {
    React.useEffect(() => {
        if (!card) return;
        const handleEscapeClose = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleEscapeClose);
        return () => {
            document.removeEventListener("keydown", handleEscapeClose)
        };
    }, [card, onClose])

    const HandleOverlayClose = (event) => {
        if (event.target === event.currentTarget && card) {
            onClose();
        }
    }

    return(
        <div className={`popup popup_image ${card ? "popup_opened" : ""}`} id="image-popup" onMouseDown={HandleOverlayClose}>
            <div className="popup__container-image">
                <button className="popup__close popup__close_mobile" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <p className="popup__text">{card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;