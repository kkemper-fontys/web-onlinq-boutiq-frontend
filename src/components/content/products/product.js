import {Link} from "react-router-dom";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

const Product = (props) => {

    // LOAD THE CART DATA FROM CART CONTEXT
    const cartCtx = useContext(CartContext);

    // THIS FUNCTION ADDS THE PRODUCT TO THE CART WHEN CLICKED ON THE OVERVIEW PAGE
    const clickHandler = (event) => {
        event.preventDefault();
        cartCtx.addItem({
            id: props.data.id,
            name: props.data.name,
            amount: 1,
            price: props.data.pricePerUnit
        });
    }

    return (
        <div className={"product"}>
            <Link to={`productDetail/${props.data.id}`}>
                <div className={"product-image"}>
                    <img src={"images/products/bbqsalt.jpg"}/>
                    {props.data.onSale && <div className={"badge product-image-sale"}>Sale</div>}
                </div>
                <div className={"product-summary"}>
                    <div className={"product-summary-tag"}>{props.data.subtitle}</div>
                    <div className={"product-summary-title"}>{props.data.name}</div>
                    <div
                        className={"product-summary-price"}>€ {(props.data.pricePerUnit / 100).toFixed(2).replace(".", ",")}</div>
                </div>
            </Link>
            <div className={"product-summary-cart"} onClick={clickHandler}>
                <img src={"images/order-button.svg"}/>
                <i className="icon fa-solid fa-basket-shopping"/>
            </div>
        </div>
    );
}

export default Product;