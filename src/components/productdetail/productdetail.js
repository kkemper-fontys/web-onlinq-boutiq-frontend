import {useParams} from "react-router-dom";
import {useFetch} from "../../hooks/use-fetch";
import React, {useEffect, useState} from "react";

const ProductDetail = () => {
    const params = useParams();
    const {fetchData, loading} = useFetch();
    const [productData, setProductData] = useState([]);
    const [isProduct, setIsProduct] = useState(false);
    const [amount, setAmount] = useState(1);

    const productId = params.productId;
    let returnData;

    const loadData = async () => {
        const data = await fetchData(`products/${productId}`);
        if (data.detail !== 'Not Found') {
            setProductData(data);
            setIsProduct(true);
        }
    }

    useEffect(loadData, []);

    if (isProduct) {
        returnData = (
            <div className={"productdetail"}>
                <div className={"productdetail-wrapper"}>
                    <div className={"productdetail-image"}>
                        <img src={"/images/products/bbqsalt.jpg"}/>
                    </div>
                    <div className={"productdetail-info"}>
                        <div className={"badge badge--big productdetail-info-sale"}>Sale</div>
                        <div className={"productdetail-info-tag"}>BBQ kruiden</div>
                        <div className={"productdetail-info-title"}>{productData.name}</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto doeiusmod tempor
                            incidition ulla mco laboris nisi ut aliquip ex ea commo condorico consectetur adipiscing
                            elitut aliquip. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto
                            doeiusmod tempor incidition ulla mco laboris nisi ut aliquip ex ea commo condorico
                            consectetur adipiscing elitut aliquip.</p>
                        <div className={"productdetail-info-line"}/>
                        <div className={"productdetail-info-wrapper"}>
                            <div className={"productdetail-info-price-wrapper"}>
                                <p>Stukprijs:</p>
                                <div
                                    className={"productdetail-info-price"}>€ {(productData.pricePerUnit / 100).toFixed(2).replace('.', ',')}</div>
                            </div>
                            <div>
                                <div className={"productdetail-info-amount-wrapper"}>
                                    <p>Aantal:</p>
                                    <input className={"productdetail-info-amount"} value={amount} onChange={(value) => {
                                        setAmount(value.target.value)
                                    }} type={"number"} min={1}/>
                                </div>
                            </div>
                        </div>
                        <div className={"productdetail-info-total"}>
                            <p>Totaalprijs:</p>
                            <div
                                className={"productdetail-info-price"}>€ {((productData.pricePerUnit * amount) / 100).toFixed(2).replace('.', ',')}</div>
                        </div>
                        <a className={"btn productdetail-info-cart"}>In winkelmand plaatsen</a>
                    </div>
                </div>
            </div>
        );
    } else {
        //TODO: aanpassen van de pagina
        returnData = <h1>Hij vind niks jonghu</h1>;
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