import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";
import {Link} from "react-router-dom";

const Menu = () => {
    const [animate, setAnimate] = useState(false);
    const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
    const cartCtx = useContext(CartContext);

    // THIS IS THE RED BUTTON ABOVE THE CART IN THE MENU THAT SHOWS THE NUMBER OF ITEMS
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    // THIS EFFECT TAKES PLACE WHEN THE PAGE LOADS OR REFRESHES TO LOAD THE ITEMS FROM THE CART AND SET THE NUMBER OF ITEMS
    useEffect(() => {
        let prev_items = JSON.parse(localStorage.getItem('cart'));
        if (prev_items) {
            if (prev_items.length > 0 && !isInitiallyFetched) {
                prev_items.map((item) => (
                    cartCtx.addItem(item)
                ));
            }
        }
        setIsInitiallyFetched(true);

    }, []);

    useEffect(() => {
        setAnimate(true);
        setTimeout(() => {
           setAnimate(false);
       }, 150)

    }, [numberOfCartItems]);

    // THIS EFFECT TAKES PLACE WHEN AN ITEM IS PUT INTO THE CART AND SETS IT TO A COOKIE
    useEffect(() => {
        if (isInitiallyFetched) {
            localStorage.setItem('cart', JSON.stringify(cartCtx.items));
        }
    }, [cartCtx.items]);

    return (
        <div className={"menu"}>
            <div className={"menu-wrapper"}>
                <a className={"menu-item"}>Home</a>
                <a className={"menu-item"}>Over ons</a>
                <a className={"menu-item"}>Producten</a>
                <a className={"menu-item"}>Recepten</a>
                <a className={"menu-item"}>Contact</a>
            </div>
            <Link to={"/cart"}>
                <div className={"menu-cart"}>
                    <div className={"menu-cart-holder"}>
                        <i className="icon fa-light fa-basket-shopping"/>
                    </div>
                    <div className={`menu-cart-badge ${animate ? "animate" : ""}`}>
                        <div className={"menu-cart-badge-amount"}>{numberOfCartItems}</div>
                    </div>
                </div>
            </Link>
            <img className={"menu-logo"} src={'/images/logo.png'}/>
        </div>
    );
}

export default Menu;