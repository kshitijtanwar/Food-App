import "./Cart.css";
import Modal from "../UI/Modal";
const Cart = (props) => {
    const cartItems = (
        <ul className="cart-items">
            {[{ id: "c1", name: "sushi", price: 12.99, quantity: 2 }].map(
                (item) => {
                    return <li key={item.id}>{item.name}</li>;
                }
            )}
        </ul>
    );
    return (
        <Modal onClose={props.onHideCart}>
            {cartItems}
            <div className="total">
                <span>Total Amount</span>
                <span>35.65</span>
            </div>
            <div className="actions">
                <button className="button--alt" onClick={props.onHideCart}>Close</button>
                <button className="button">Order</button>
            </div>
        </Modal>
    );
};
export default Cart;
