const Product = () => {
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
            </div>
        </div>
    );

}

export default Product;