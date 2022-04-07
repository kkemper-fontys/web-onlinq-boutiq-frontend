import Navigation from "./navigation/navigation";
import Products from "./products/products";

const Content = () => {
    return (
        <section className={"content"}>
            <div className={"container"}>
                <div className={"content-wrapper"}>
                    <Navigation/>
                    <Products/>
                </div>
            </div>
        </section>
    );
}

export default Content;