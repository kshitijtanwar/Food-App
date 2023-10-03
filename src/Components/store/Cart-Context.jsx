import React from "react"; // Import React

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearItems: () => {}
});
export default CartContext;
