import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormWithValidation} from "../hooks/useForm";

function AddPlacePopup({onUpdatePlace, isOpen, onClose, isSending}) {
    const [cardInfo] = useState({name: "", link: ""});
    const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

    React.useEffect(() => {
        if (cardInfo) {
            resetForm(cardInfo, {}, false);
        }
    }, [cardInfo, resetForm, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdatePlace(values);
    }

    return (
        <PopupWithForm title={"Новое место"} formName={"add-card-form"} onSubmit={handleSubmit}
                       submitButton={isSending ? "Сохранение..." : "Сохранить"} isOpen={isOpen} onClose={onClose} isDisabled={!isValid} children={
            <>
                <input type="text" className="popup__input" value={values.name ?? ""} onChange={handleChange} name="name"
                       id="name" minLength="2" maxLength="30"
                       placeholder="Название" aria-label="Введите название" required/>
                <span className="popup__input-error popup__title-error">{errors.name ?? ""}</span>
                <input type="url" className="popup__input" value={values.link} name="link" onChange={handleChange}
                       id="link"
                       placeholder="Ссылка на картинку" aria-label="Введите ссылку на картинку"
                       required/>
                <span className="popup__input-error popup__link-error">{errors.link}</span>
            </>
        }/>
    );
}

export default AddPlacePopup;