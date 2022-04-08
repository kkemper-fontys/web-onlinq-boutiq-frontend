import {Link} from "react-router-dom";

const Product = (props) => {
    const clickHandler = async () => {
        console.log('test');
    }
    return (
        <Link to={`productDetail/${props.data.id}`} className={"product"}>
            <div className={"product-image"}>
                <img src={"images/products/bbqsalt.jpg"}/>
                <div className={"badge product-image-sale"}>Sale</div>
            </div>
            <div className={"product-summary"}>
                <div className={"product-summary-tag"}>BBQ kruiden</div>
                <div className={"product-summary-title"}>{props.data.name}</div>
                <div
                    className={"product-summary-price"}>€ {(props.data.pricePerUnit / 100).toFixed(2).replace(".", ",")}</div>
                <div className={"product-summary-cart"} onClick={clickHandler}>
                    <img src={"images/order-button.svg"}/>
                    <i className="icon fa-solid fa-basket-shopping"></i>
                </div>
            </div>
        </Link>
    );
}

export default Product;