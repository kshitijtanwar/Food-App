import { useReducer } from "react";
import CartContext from "./Cart-Context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id;
        });
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        const updatedTotalAmount = updatedItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    
    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.id;
        });
        const existingCartItem = state.items[existingCartItemIndex];

        // Ensure that updatedTotalAmount is never negative
        const updatedTotalAmount = Math.max(
            0,
            state.totalAmount - existingCartItem.price
        );

        let updatedItems;
        if (existingCartItem.quantity === 1) {
            // Remove the item from updatedItems when quantity is 0
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if (action.type === "CLEAR") {
        return defaultCartState;
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
    };
    const clearAllItemFromCartHandler = () => {
        dispatchCartAction({ type: "CLEAR" });
    };

    const cartContextHelper = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearItems: clearAllItemFromCartHandler,
    };
    return (
        <CartContext.Provider value={cartContextHelper}>
            {props.children}
        </CartContext.Provider>
    );
};
export default CartProvider;
