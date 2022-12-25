import React from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";
import {useFormWithValidation} from "../hooks/useForm";

function EditProfilePopup({onUpdateUser, isOpen, onClose, isSending}) {
    const currentUser = React.useContext(CurrentUserContext);
    const {name, about} = currentUser;
    const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

    React.useEffect(() => {
        if (currentUser) {
            resetForm({name, about}, {}, false);
        }
    }, [currentUser, resetForm, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser(values)
    }

    return (
        <PopupWithForm title={"Редактировать профиль"} formName={"profile-form"} onSubmit={handleSubmit}
                       submitButton={isSending ? "Сохранение..." : "Сохранить"} isOpen={isOpen} onClose={onClose} isDisabled={!isValid || isSending} children={
            <>
                <input type="text" className="popup__input" value={values.name ?? ''} onChange={handleChange}
                       name="name" id="name" minLength="2" maxLength="40" required
                       aria-label="Введите Имя"/>
                <span className="popup__input-error popup__name-error">{errors.name || ""}</span>
                <input type="text" className="popup__input" value={values.about ?? ''} onChange={handleChange}
                       name="about" id="about" minLength="2" maxLength="200" required
                       aria-label="Введите статус"/>
                <span className="popup__input-error popup__about-error">{errors.about || ""}</span>
            </>
        }/>
    );
}

export default EditProfilePopup;
