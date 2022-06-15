import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    subtotal: 0,
    total: 0,
    coupons: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    deleteItem: (id) => {},
    changeItem: (id) => {},
    addCoupon: (coupon) => {},
    setSubTotal: (subTotal) => {},
    setTotal: (total) => {}
});

export default CartContext;