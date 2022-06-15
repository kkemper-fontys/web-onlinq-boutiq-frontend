import {useParams} from "react-router-dom";
import {useFetch} from "../../hooks/use-fetch";
import {useContext} from "react";
import React, {useEffect, useRef, useState} from "react";
import CartContext from "../../store/cart-context";

const ProductDetail = () => {
    const [tags, setTags] = useState([]);
    const amountInputRef = useRef();
    const cartCtx = useContext(CartContext);
    const params = useParams();
    const {fetchData, loading} = useFetch();
    const [productData, setProductData] = useState([]);
    const [isProduct, setIsProduct] = useState(false);
    const [amountIsValid, setAmountIsValid] = useState(true);
    const [amount, setAmount] = useState(1);
    const [initialLoad, setInitialLoad] = useState(true);

    const productId = params.productId;
    let returnData;

    // THIS FUNCTION GETS THE DATA OF A PRODUCT FROM THE API BACK-END
    const loadData = async () => {
        if (initialLoad) {
            const data = await fetchData(`api/products/${productId}.json`);
            if (data.detail !== 'Not Found') {
                setProductData(data);
                setIsProduct(true);

                const tags = data.tags.filter(async (tag) => {
                    const fetchTag = await fetchData(`api/tags/${tag.substr(10)}.json`);
                    setTags(tags => [...tags, fetchTag]);
                    return tag;
                });
            }
            setInitialLoad(false);
        }
    }

    // THIS EFFECT TAKES PLACE ON PAGE LOAD AND LOADS THE PRODUCT DATA
    useEffect(loadData, []);

    // THIS FUNCTION ADDS THE NUMBER OF INPUT FIELD ITEMS OF PRODUCT TO THE CART
    const addToCart = (enteredAmount) => {
        cartCtx.addItem({
            id: productId,
            name: productData.name,
            amount: enteredAmount,
            price: productData.pricePerUnit
        })
    }

    // THIS FUNCTION CHECKS WHATS ENTERED IN THE INPUT FIELD AND IS VALID AND ADDS IT TO THE CART
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1) {
            setAmountIsValid(false);
            return;
        }
        addToCart(enteredAmountNumber);
    }

    if (isProduct) {
        returnData = (
            <div className={"productdetail"}>
                <div className={"productdetail-wrapper"}>
                    <div className={"productdetail-image"}>
                        <img src={"/images/products/bbqsalt.jpg"}/>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className={"productdetail-info"}>
                            {productData.onSale &&
                            <div className={"badge badge--big productdetail-info-sale"}>Sale</div>}
                            <div className={"productdetail-info-tag"}>{productData.subtitle}</div>
                            <div className={"productdetail-info-title"}>{productData.name}</div>
                            <div dangerouslySetInnerHTML={{__html: productData.description}} />
                            <div className={"productdetail-info-line"}/>
                            <h4>Tags</h4>
                            <div className={"tags"}>

                                {tags.map((tag) => {
                                    return <div className={`tag`} key={tag.id}>{tag.name}</div>
                                })}
                            </div>
                            <div className={"productdetail-info-wrapper"}>
                                <div className={"productdetail-info-price-wrapper"}>
                                    <p>Stukprijs:</p>
                                    <div
                                        className={"productdetail-info-price"}>€ {(productData.pricePerUnit / 100).toFixed(2).replace('.', ',')}</div>
                                </div>
                                <div>
                                    <div className={"productdetail-info-amount-wrapper"}>
                                        <p>Aantal:</p>
                                        <input ref={amountInputRef} className={"productdetail-info-amount"}
                                               value={amount} onChange={(value) => {
                                            setAmount(value.target.value)
                                        }} type={"number"} min={1} step={1}/>
                                    </div>
                                </div>
                            </div>
                            <div className={"productdetail-info-total"}>
                                <p>Totaalprijs:</p>
                                <div
                                    className={"productdetail-info-price"}>€ {((productData.pricePerUnit * amount) / 100).toFixed(2).replace('.', ',')}</div>
                            </div>
                            <button className={"btn productdetail-info-cart"}>In winkelmand plaatsen</button>
                            {!amountIsValid && <p>Please enter a valid amount</p>}
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        returnData = <div><h2>Geen producten gevonden</h2><p>Er is geen product met dit id gevonden</p></div>;
    }

    return (
        <section className={"productdetail"}>
            <div className={"container"}>
                {loading && (
                    <div className={"spinner"}>
                        <i className={"fas fa-spinner fa-2x"}/>
                    </div>
                )}
                {!loading && returnData}
            </div>
        </section>
    );
}

export default ProductDetail;