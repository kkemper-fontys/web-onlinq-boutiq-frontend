import {useParams} from "react-router-dom";
import {useFetch} from "../../hooks/use-fetch";
import {useEffect, useState} from "react";

const ProductDetail = () => {
    const params = useParams();
    const {fetchData, loading} = useFetch();
    const [productData, setProductData] = useState([]);
    const [isProduct, setIsProduct] = useState(false);

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
            <div>
                <h1>Product</h1>
                <p>{productData.name}</p>
            </div>
        );
    } else {
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