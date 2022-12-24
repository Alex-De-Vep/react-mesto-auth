import React, { useState } from "react";

export const useForm = () => {
    const [values, setValues] = useState({});

    const handleChange = (evt) => {
        const input = evt.target;
        const value = input.value;
        const name = input.name;
        setValues({...values, [name]: value});
    }

    return {values, handleChange, setValues};
}
