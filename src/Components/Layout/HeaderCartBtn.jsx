import CartIcon from "../Cart/CartIcon";
import "./HeaderCartBtn.css";
import CartContext from "../store/Cart-Context";
import { useContext } from "react";

const HeaderCartBtn = ({ onClick }) => {
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.quantity;
    }, 0);
    return (
        <button className="button" onClick={onClick}>
            <span className="icon">
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className="badge">{numberOfCartItems}</span>
        </button>
    );
};
export default HeaderCartBtn;
