import { useState } from "react"
const useInput = (validate) => {
  const[value, setValue] = useState('');
  const[isTouched, setIsTouched] = useState(false);
  const isValid = validate(value);
  const hasError = isTouched && !isValid;

  const valueBlurHandler = () => {
    setIsTouched(true);
  }
  const inputHandler = (e) => {
    setValue(e.target.value);
  }
  const inputReset = () => {
    setValue('');
    setIsTouched(false);
  }
  return {
    value : value,
    error: hasError,
    isValid : isValid,
    inputHandler,
    inputReset,
    valueBlurHandler
  }
}
export default useInput