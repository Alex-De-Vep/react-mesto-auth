import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupConfirm({onSubmit, isOpen, onClose, isSending}) {
    function handleSubmit(e) {
        e.preventDefault();

        onSubmit();
    }

    return(
        <PopupWithForm title={"Вы уверены?"} formName={"remove-form"} onSubmit={handleSubmit} submitButton={isSending ? "Отправка..." : "Да"} isOpen={isOpen} isDisabled={isSending} onClose={onClose} />
    );
}

export default PopupConfirm;