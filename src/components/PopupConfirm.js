import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupConfirm({onSubmit, isOpen, onClose}) {
    function handleSubmit(e) {
        e.preventDefault();

        onSubmit();
    }

    return(
        <PopupWithForm title={"Вы уверены?"} formName={"remove-form"} onSubmit={handleSubmit} submitButton={"Да"} isOpen={isOpen} onClose={onClose} />
    );
}

export default PopupConfirm;