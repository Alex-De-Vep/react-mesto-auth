import React from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";
import {useForm} from "../hooks/useForm";


function EditProfilePopup({onUpdateUser, isOpen, onClose, submitButton}) {
    const currentUser = React.useContext(CurrentUserContext);
    const {values, handleChange, setValues} = useForm();

    React.useEffect(() => {
        if (currentUser) {
            setValues(currentUser);
        }
    }, [currentUser, setValues, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser(values)
    }

    return (
        <PopupWithForm title={"Редактировать профиль"} formName={"profile-form"} onSubmit={handleSubmit} submitButton={submitButton} isOpen={isOpen} onClose={onClose} children={
            <>
                <input type="text" className="popup__input" value={values.name ?? ''} onChange={handleChange} name="name" id="name" minLength="2" maxLength="40" required
                       aria-label="Введите Имя" />
                <span className="popup__input-error popup__name-error"></span>
                <input type="text" className="popup__input" value={values.about ?? ''} onChange={handleChange} name="about" id="about" minLength="2" maxLength="200" required
                       aria-label="Введите статус" />
                <span className="popup__input-error popup__about-error"></span>
            </>
        } />
    );
}

export default EditProfilePopup;
