import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, submitButton}) {
    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return(
        <PopupWithForm title={"Обновить аватар"} formName={"avatar-form"} onSubmit={handleSubmit} submitButton={submitButton} isOpen={isOpen} onClose={onClose} children={
            <>
                <input type="url" className="popup__input" name="avatar" id="avatar"
                       placeholder="Ссылка на картинку" ref={inputRef} aria-label="Введите ссылку на картинку" required />
                <span className="popup__input-error popup__avatar-error"></span>
            </>
        } />
    );
}

export default EditAvatarPopup;
