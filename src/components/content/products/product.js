
const Product = () => {
    const clickHandler = async () => {
        console.log('test');
    }
    return (
        <div className={"product"}>
            <div className={"product-image"}>
                <img src={"images/products/bbqsalt.jpg"} />
                <div className={"badge product-image-sale"}>Sale</div>
            </div>
            <div className={"product-summary"}>
                <div className={"product-summary-tag"}>BBQ kruiden</div>
                <div className={"product-summary-title"}>BBQ Salt</div>
                <div className={"product-summary-price"}>€ 5,99</div>
                <div className={"product-summary-cart"} onClick={clickHandler}>
                    <img src={"images/order-button.svg"} />
                    <i className="icon fa-solid fa-basket-shopping"></i>
                </div>
            </div>
        </div>
    );
}

export default Product;