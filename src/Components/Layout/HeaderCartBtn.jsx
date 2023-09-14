import CartIcon from "../Cart/CartIcon";
import "./HeaderCartBtn.css";
import CartContext from "../store/Cart-Context";
import { useContext, useEffect, useState } from "react";

const HeaderCartBtn = ({ onClick }) => {
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);
        },300)
        return () => {
          clearInterval(timer);
        }
    }, [items]);
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.quantity;
    }, 0);

    return (
        <button
            className={`button ${btnIsHighlighted && "bump"}`}
            onClick={onClick}
        >
            <span className="icon">
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className="badge">{numberOfCartItems}</span>
        </button>
    );
};
export default HeaderCartBtn;
