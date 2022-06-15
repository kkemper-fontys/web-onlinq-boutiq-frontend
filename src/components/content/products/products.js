import Product from "./product";
import {useFetch} from "../../../hooks/use-fetch";
import {useEffect, useState} from "react";

const Products = (props) => {
    const {fetchData, loading} = useFetch();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // THIS FUNCTION LOADS THE PRODUCTS FROM THE API BACK-END AND SETS THE VALUES FOR THE PRICE RANGE FILTER
    const loadProducts = async (priceRange = false) => {
        const data = await fetchData('api/products.json');
        const maxValue = data.reduce(function (prev, current) {
            return (+prev.pricePerUnit > +current.pricePerUnit) ? prev : current
        })
        const minValue = data.reduce(function (prev, current) {
            return (+prev.pricePerUnit < +current.pricePerUnit) ? prev : current
        })
        props.maxValue((maxValue.pricePerUnit / 100));
        props.minValue((minValue.pricePerUnit / 100));
        setProducts(data);
        setFilteredProducts(data);
    }

    // THIS FUNCTION FILTERS THE PRODUCTS WITH THE FOUR DIFFERENT FILTERS IF USED
    const filterProducts = (priceRangeFilter, saleFilter, tagFilter, searchFilter) => {

        let productsInRange;
        let productsOnSale;
        let productsInSearch;
        let productsInTags;

        if (priceRangeFilter[0] !== 0 && priceRangeFilter[1] !== 0) {
            productsInRange = products.filter((product) => {
                return ((+product.pricePerUnit / 100) >= priceRangeFilter[0] && (+product.pricePerUnit / 100) <= (priceRangeFilter[1] + 1));
            });
        } else {
            productsInRange = products;
        }

        if (saleFilter) {
            productsOnSale = productsInRange.filter((product) => {
                return product.onSale === saleFilter;
            });
        } else {
            productsOnSale = productsInRange;
        }

        if (searchFilter) {
            productsInSearch = productsOnSale.filter((product) => {
                if (product.name.toLowerCase().indexOf(searchFilter.toLowerCase()) >= 0) {
                    return product;
                }
            });
        } else {
            productsInSearch = productsOnSale;
        }

        if (tagFilter.length > 0) {
            productsInTags = productsInSearch.filter((product) => {
                const tagIds = [];
                let isInFilter = false;
                const tags = product.tags.filter((tag) => {
                    tagIds.push(+tag.substr(10));
                    return tag;
                });

                tagFilter.filter((tag) => {
                    if (tagIds.includes(tag)) {
                        isInFilter = true;
                    }
                });
                if (isInFilter) {
                    return product;
                }
            });
        } else {
            productsInTags = productsInSearch;
        }

        setFilteredProducts(productsInTags);
    }

    // THIS EFFECT TAKES PLACE WHEN ONE OF THE FILTERS CHANGES AND SHOWS THE FILTERED PRODUCTS
    useEffect(() => {
        filterProducts(props.priceRangeFilter, props.saleFilter, props.tagFilter, props.searchFilter);
    }, [props.priceRangeFilter, props.saleFilter, props.tagFilter, props.searchFilter])

    // THIS EFFECT TAKES PLACE WHEN THE PAGE IS LOADED AND LOADS THE INITIAL PRODUCTS
    useEffect(loadProducts, []);

    return (
        <div className={"products"}>
            <h2>Al onze producten</h2>
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
                    {filteredProducts.map((product) => (
                        <Product key={product.id} data={product}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;