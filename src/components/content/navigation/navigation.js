import Tags from "./tags";
import Price from "./price";
import Sale from "./sale";
import Searchbar from "./search";

const Navigation = () => {
    return (
        <div className={"navigation"}>
            <Searchbar />
            <Tags/>
            <Price/>
            <Sale/>
        </div>
    );
}

export default Navigation;