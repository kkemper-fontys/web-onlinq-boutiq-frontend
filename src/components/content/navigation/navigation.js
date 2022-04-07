import Tags from "./tags";
import Price from "./price";
import Sale from "./sale";

const Navigation = () => {
    return (
        <div className={"navigation"}>
            <Tags/>
            <Price/>
            <Sale/>
        </div>
    );
}

export default Navigation;