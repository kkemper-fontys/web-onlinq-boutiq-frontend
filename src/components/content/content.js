import Navigation from "./navigation/navigation";
import Products from "./products/products";
import {useState} from "react";

const Content = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1);

    // FILTER STATES
    const [priceRangeInput, setPriceRangeInput] = useState([0, 0]);
    const [saleInput, setSaleInput] = useState(false);
    const [tagInput, setTagInput] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    // THIS FUNCTION SETS THE STATE OF THE MAXVALUE OF THE PRICE RANGE SLIDER
    const maxValueHandler = (maxValue) => {
        setMaxValue(maxValue);
    }

    // THIS FUNCTION SETS THE STATE OF THE MINVALUE OF THE PRICE RANGE SLIDER
    const minValueHandler = (minValue) => {
        setMinValue(minValue);
    }

    // THIS FUNCTION SETS THE STATE THE PRICE RANGE WHEN IT CHANGES
    const priceRangeChangeHandler = (values) => {
        setPriceRangeInput(values);
    }

    // THIS FUNCTION SETS THE STATE OF THE SALE BUTTON
    const saleHandler = (value) => {
        setSaleInput(value);
    }

    // THIS FUNCTION SETS THE STATE OF THE TAGS WHEN IT CHANGES
    const tagHandler = (values) => {
        setTagInput(values);
    }

    // THIS FUNCTION SETS THE STATE OF THE SEARCH INPUT WHEN IT CHANGES
    const searchHandler = (value) => {
        setSearchInput(value);
    }

    return (
        <section className={"content"}>
            <div className={"container"}>
                <div className={"content-wrapper"}>
                    <Navigation maxValue={maxValue} minValue={minValue} setPriceRange={priceRangeChangeHandler}
                                saleHandler={saleHandler} tagHandler={tagHandler} searchHandler={searchHandler}/>
                    <Products maxValue={maxValueHandler} minValue={minValueHandler} priceRangeFilter={priceRangeInput}
                              saleFilter={saleInput} tagFilter={tagInput} searchFilter={searchInput}/>
                </div>
            </div>
        </section>
    );
}

export default Content;