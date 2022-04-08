import Product from "./product";
import {useFetch} from "../../../hooks/use-fetch";
import {useEffect, useState} from "react";

const Products = () => {
    const {fetchData, loading} = useFetch();
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const data = await fetchData('products');
        setProducts(data);
    }

    useEffect(loadProducts, []);

    return (
        <div className={"products"}>
            <h1>Al onze producten</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto doeiusmod tempor
                incidition ulla mco laboris nisi ut aliquip ex ea commo condorico consectetur adipiscing elitut
                aliquip.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedolorm reminusto doeiusmod tempor
                incidition
                ulla mco laboris nisi ut aliquip ex ea commo condorico consectetur adipiscing elitut aliquip.</p>
            {loading && (
                <div className={"spinner"}>
                    <i className={"fas fa-spinner fa-2x"}/>
                </div>
            )}
            {!loading && (
                <div className={"products-wrapper"}>
                    {products.map((product) => (
                        <Product key={product.id} data={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;