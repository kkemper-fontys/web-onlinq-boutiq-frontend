import Tags from "./tags";
import Price from "./price";
import Sale from "./sale";
import Searchbar from "./search";
import {useState} from "react";

const Navigation = (props) => {
    const [showFilters, setShowFilters] = useState("hidden");

    const priceRangeChangeHandler = (values) => {
        props.setPriceRange(values);
    }

    const filterSaleHandler = (values) => {
        props.saleHandler(values);
    }

    const tagFilterHandler = (values) => {
        props.tagHandler(values)
    }

    const searchFilterHandler = (value) => {
        props.searchHandler(value);
    }

    // WHEN ON MOBILE THIS SHOWS THE FILTERS
    const showFiltersHandler = () => {
        if(showFilters === "hidden"){
            setShowFilters("visible");
        } else {
            setShowFilters("hidden");
        }
    }

    return (
        <>
            <div className={"topbar"}><p>Filters</p><i onClick={showFiltersHandler} className="fa-solid fa-sliders-up" /></div>
            <div className={`navigation ${showFilters}`}>
                <div className={'navigation-wrapper'}>
                    <Searchbar searchHandler={searchFilterHandler}/>
                    <Tags tagFilter={tagFilterHandler}/>
                    <Price maxValue={props.maxValue} minValue={props.minValue} setPriceRange={priceRangeChangeHandler}/>
                    <Sale sale={filterSaleHandler}/>
                </div>
            </div>
        </>
    );
}

export default Navigation;