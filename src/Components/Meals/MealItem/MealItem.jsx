import { useContext } from "react";
import "./MealItem.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/Cart-Context";
const MealItem = ({ name, description, price, id }) => {
    const cartCtx = useContext(CartContext);
    const itemPrice = `$${price.toFixed(2)}`;
    const addToCartHandler = (qty) => {
        cartCtx.addItem({
            id: id,
            name: name,
            qty: qty,
            price: price,
        });
    };
    return (
        <li className="meal">
            <div>
                <h3>{name}</h3>
                <div className="description">{description}</div>
                <div className="price">{itemPrice}</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};
export default MealItem;
