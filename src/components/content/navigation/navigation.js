import Tags from "./tags";
import Price from "./price";
import Sale from "./sale";

const Navigation = () => {
    return (
        <section>
            <div className={"container"}>
                <div className={"navigation"}>
                    <Tags />
                    <Price />
                    <Sale />
                </div>
            </div>
        </section>
    );
}

export default Navigation;