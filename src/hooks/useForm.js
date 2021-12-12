import React, { useState } from 'react';

const useForm = (validate) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [inputIsTouched, setInputIsTouched] = useState(false);

  // validate is a function that is accepted as an argument
  const isValid = validate(enteredValue);
  const hasError = !isValid && inputIsTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  }
  
  const inputTouchHandler = () => {
    setInputIsTouched(true);
  }

  return {
    enteredValue,
    hasError,
    isValid,
    inputChangeHandler,
    inputTouchHandler
  }
};

export default useForm;
