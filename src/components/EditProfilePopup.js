import React, {useState}from "react";
import { currentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";


function EditProfilePopup({onUpdateUser, isOpen, onClose, submitButton}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const currentUser = React.useContext(currentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description
        })
    }

    return (
        <PopupWithForm title={"Редактировать профиль"} formName={"profile-form"} onSubmit={handleSubmit} submitButton={submitButton} isOpen={isOpen} onClose={onClose} children={
            <>
                <input type="text" className="popup__input" value={name ?? ''} onChange={handleChangeName} name="name" id="name" minLength="2" maxLength="40" required
                       data-name aria-label="Введите Имя" />
                <span className="popup__input-error popup__name-error"></span>
                <input type="text" className="popup__input" value={description ?? ''} onChange={handleChangeAbout} name="about" id="about" minLength="2" maxLength="200" required
                       data-about aria-label="Введите статус" />
                <span className="popup__input-error popup__about-error"></span>
            </>
        } />
    );
}

export default EditProfilePopup;
