import React, {useEffect, useRef, useState} from "react";

const Searchbar = (props) => {
    const searchInput = useRef();

    const [searchFilter, setSearchFilter] = useState("");

    // THIS EFFECT TAKES PLACE WHEN SOMETHING IS ENTERED IN THE SEARCH INPUT FIELD AND SENDS THAT INPUT TO ITS PARENT
    useEffect(() => {
        props.searchHandler(searchFilter);
    }, [searchFilter]);

    return (
        <div className={"searchbar"}>
            <div className={"searchbar-wrapper"}>
                <input ref={searchInput}
                       type={"text"}
                       placeholder={"Zoeken naar"}
                       className={"searchbar-inputfield"}
                       value={searchFilter}
                       onChange={(value) => {
                           setSearchFilter(value.target.value)
                       }}
                />
            </div>
        </div>
    )
}

export default Searchbar;