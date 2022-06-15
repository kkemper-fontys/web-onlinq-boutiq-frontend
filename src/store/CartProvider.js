import {useReducer} from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
    subtotal: 0,
    total: 0,
    coupons: []
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const exisitingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (exisitingCartItem) {
            const updatedItem = {
                ...exisitingCartItem,
                amount: exisitingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            coupons: state.coupons,
            subtotal: state.subtotal,
            total: state.total
        }
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            coupons: state.coupons,
            subtotal: state.subtotal,
            total: state.total
        }
    }

    if(action.type === 'DELETE'){
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price * existingItem.amount;
        const updatedItems = state.items.filter((item) => item.id !== action.id);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            coupons: state.coupons,
            subtotal: state.subtotal,
            total: state.total
        }
    }

    if(action.type === 'CHANGE'){
        const updatedItems = state.items;
        const updatedTotalAmount = state.totalAmount;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            coupons: state.coupons,
            subtotal: state.subtotal,
            total: state.total
        }
    }

    if(action.type === 'ADDCOUPON'){
        let updatedCoupons;
        if(!state.coupons || state.coupons.length === 0){
            updatedCoupons = [action.coupon];
        } else {
            updatedCoupons = [...state.coupons, action.coupon];
        }
        return {
            items: state.items,
            totalAmount: state.totalAmount,
            coupons: updatedCoupons,
            subtotal: state.subtotal,
            total: state.total
        }
    }

    if(action.type === 'SETSUBTOTAL'){
        return {
            items: state.items,
            totalAmount: state.totalAmount,
            coupons: state.coupons,
            subtotal: action.subtotal,
            total: state.total
        }
    }

    if(action.type === 'SETTOTAL'){
        return {
            items: state.items,
            totalAmount: state.totalAmount,
            coupons: state.coupons,
            subtotal: state.subtotal,
            total: action.total
        }
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        });
    }

    const removeItemToCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    }

    const changeItemToCartHandler = (id) => {
        dispatchCartAction({
            type: 'CHANGE',
            id: id
        })
    }

    const deleteItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'DELETE',
            id: id
        })
    }

    const addCouponHandler = (coupon) => {
        dispatchCartAction({
            type: 'ADDCOUPON',
            coupon: coupon
        })
    }

    const setSubTotalHandler = (subTotal) => {
        dispatchCartAction({
            type: 'SETSUBTOTAL',
            subTotal: subTotal
        })
    }

    const setTotalHandler = (total) => {
        dispatchCartAction({
            type: 'SETTOTAL',
            total: total
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        coupons: cartState.coupons,
        subTotal: cartState.subTotal,
        total: cartState.total,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        changeItem: changeItemToCartHandler,
        deleteItem: deleteItemFromCartHandler,
        setSubTotal: setSubTotalHandler,
        setTotal: setTotalHandler,
        addCoupon: addCouponHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;