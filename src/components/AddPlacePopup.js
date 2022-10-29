import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onUpdatePlace, isOpen, onClose, submitButton}) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdatePlace({
            name,
            link
        });
    }

    return(
        <PopupWithForm title={"Новое место"} formName={"add-card-form"} onSubmit={handleSubmit} submitButton={submitButton} isOpen={isOpen} onClose={onClose} children={
            <>
                <input type="text" className="popup__input" value={name} onChange={handleChangeName} name="name" id="title" minLength="2" maxLength="30"
                       placeholder="Название" aria-label="Введите название" required/>
                <span className="popup__input-error popup__title-error"></span>
                <input type="url" className="popup__input" value={link} name="link" onChange={handleChangeLink} id="link"
                       placeholder="Ссылка на картинку" aria-label="Введите ссылку на картинку"
                       required/>
                <span className="popup__input-error popup__link-error"></span>
                <button type="submit" className="popup__button">{submitButton}</button>
            </>
        } />
    );
}

export default AddPlacePopup;