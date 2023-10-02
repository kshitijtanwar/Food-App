import useInput from "../useInputHook/useInput";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
    let formIsValid = false;
    const phoneValidation = (phone) => {
        return phone.length === 10 && !phone.includes(".");
    };
    const addressValidation = (address) => {
        return address.length !== 0;
    };
    const {
        value: enteredName,
        error: enteredNameHasError,
        isValid: enteredNameIsValid,
        inputHandler: nameChangeHandler,
        inputReset: nameReset,
        valueBlurHandler: nameBlurHandler,
    } = useInput((value) => value.trim().length !== 0);
    const {
        value: enteredLastName,
        inputHandler: lastnameChangeHandler,
        inputReset: lastNameReset,
    } = useInput((value) => value.trim().length !== 0);
    const {
        value: enteredPhone,
        error: enteredPhoneHasError,
        isValid: enteredPhoneIsValid,
        inputHandler: phoneChangeHandler,
        inputReset: phoneReset,
        valueBlurHandler: phoneBlurHandler,
    } = useInput(phoneValidation);
    const {
        value: enteredAddress,
        error: enteredAddressHasError,
        isValid: enteredAddressIsValid,
        inputHandler: addressChangeHandler,
        inputReset: addressReset,
        valueBlurHandler: addressBlurHandler,
    } = useInput(addressValidation);

    const checkoutSubmitHandler = (event) => {
        event.preventDefault();
        if (enteredName.trim().length === 0) {
            return;
        }
        props.onConfirm({
            firstName: enteredName,
            lastName: enteredLastName,
            address: enteredAddress,
            phone: enteredPhone,
        });
        nameReset();
        lastNameReset();
        phoneReset();
        addressReset();
    };

    if (enteredNameIsValid && enteredPhoneIsValid && enteredAddressIsValid) {
        formIsValid = true;
    }
    return (
        <form className={classes.form} onSubmit={checkoutSubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="fname"> Name</label>
                <input
                    type="text"
                    id="name"
                    value={enteredName}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                />
                {enteredNameHasError && (
                    <p className={classes.errorTxt}>Name cannot be Empty</p>
                )}
            </div>
            <div className={classes.control}>
                <label htmlFor="lname">Last Name</label>
                <input
                    type="text"
                    id="name"
                    onChange={lastnameChangeHandler}
                    value={enteredLastName}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="name"
                    value={enteredAddress}
                    onChange={addressChangeHandler}
                    onBlur={addressBlurHandler}
                />
                {enteredAddressHasError && (
                    <p className={classes.errorTxt}>
                        Please enter valid address
                    </p>
                )}
            </div>
            <div className={classes.control}>
                <label htmlFor="number">Phone</label>
                <input
                    type="number"
                    id="name"
                    value={enteredPhone}
                    onChange={phoneChangeHandler}
                    onBlur={phoneBlurHandler}
                />
                {enteredPhoneHasError && (
                    <p className={classes.errorTxt}>Please Enter Valid Phone</p>
                )}
            </div>
            <div className={classes.actions}>
                <button
                    className={classes.submit}
                    type="submit"
                    disabled={!formIsValid}
                >
                    Confirm
                </button>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};
export default Checkout;
