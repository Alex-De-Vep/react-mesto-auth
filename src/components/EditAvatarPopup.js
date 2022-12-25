import React from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormWithValidation} from "../hooks/useForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isSending}) {
    const [avatar] = React.useState({avatar: ""});
    const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

    React.useEffect(() => {
        if (avatar) {
            resetForm(avatar, {}, false);
        }
    }, [avatar, resetForm, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar(values);
    }

    return (
        <PopupWithForm title={"Обновить аватар"} formName={"avatar-form"} onSubmit={handleSubmit}
                       submitButton={isSending ? "Сохранение..." : "Сохранить"} isOpen={isOpen} onClose={onClose} isDisabled={!isValid || isSending} children={
            <>
                <input type="url" className="popup__input" name="avatar" id="avatar" onChange={handleChange}
                       placeholder="Ссылка на картинку" value={values.avatar ?? ''} aria-label="Введите ссылку на картинку"
                       required/>
                <span className="popup__input-error popup__avatar-error">{errors.avatar || ""}</span>
            </>
        }/>
    );
}

export default EditAvatarPopup;
