import "./Cart.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../store/Cart-Context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
    const [hasCheckout, setCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item);
    };
    const onCheckout = () => {
        setCheckout(true);
    };

    const cartItems = (
        <ul className="cart-items">
            {cartCtx.items.map((item) => {
                return (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onAdd={cartItemAddHandler.bind(null, item)}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    />
                );
            })}
        </ul>
    );
    const submittedDetailsHandler = (userData) => {
        fetch(
            "https://react-meals-41662-default-rtdb.firebaseio.com/orders.json?auth=UdCBnM1guUHaZjwXcth30DVhlYl3IgohlN6l1aNS",
            {
                method: "POST",
                body: JSON.stringify({
                    userInfo: userData,
                    orderedItems: cartCtx.items,
                }),
            }
        );
    };
    return (
        <Modal onClose={props.onHideCart}>
            {cartItems}
            <div className="total">
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {hasCheckout && (
                <Checkout
                    onConfirm={submittedDetailsHandler}
                    onCancel={props.onHideCart}
                />
            )}
            {!hasCheckout && (
                <div className="actions">
                    <button className="button--alt" onClick={props.onHideCart}>
                        Close
                    </button>
                    {hasItems && (
                        <button className="button" onClick={onCheckout}>
                            Order
                        </button>
                    )}
                </div>
            )}
        </Modal>
    );
};
export default Cart;
