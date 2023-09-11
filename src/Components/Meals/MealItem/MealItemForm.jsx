import { useRef, useState } from "react";
import Input from "../../UI/Input";
import "./MealItemForm.css";
const MealItemForm = (props) => {
    const quantityRef = useRef();
    const [qtyIsValid, setQtyIsValid] = useState(true);
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredQty = quantityRef.current.value;
        const enteredQtyAsNum = +enteredQty;
        if(enteredQtyAsNum < 1 || enteredQty.trim().length === 0){
            setQtyIsValid(false);
            return;
        }
        props.onAddToCart(enteredQtyAsNum);
    };
    return (
        <form className="form" onSubmit={submitHandler}>
            <Input
                ref={quantityRef}
                label="Quantity"
                input={{
                    id: "quantity_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    defaultValue: "1",
                }}
            />
            <button type="submit">+ Add</button>
            {!qtyIsValid && <p className="isValid-text">Please enter valid Amount</p>}
        </form>
    );
};
export default MealItemForm;
