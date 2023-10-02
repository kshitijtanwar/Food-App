import classes from "./Checkout.module.css";
const Checkout = (props) => {
    const checkoutSubmitHandler = (event) => {
        event.preventDefault();
    }
    return (
        <form className={classes.form} onSubmit={checkoutSubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="fname"> Name</label>
                <input type="text" id="name" />
            </div>
            <div className={classes.control}>
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="name" />
            </div>
            <div className={classes.control}>
                <label htmlFor="address">Address</label>
                <input type="text" id="name" />
            </div>
            <div className={classes.control}>
                <label htmlFor="number">Phone</label>
                <input type="number" id="name" />
            </div>
            <div className={classes.actions}>
                <button className={classes.submit}type="submit">Confirm</button>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};
export default Checkout;
