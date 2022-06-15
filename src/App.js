import './scss/app.scss';
import {Routes, Route} from 'react-router-dom';
import Menu from "./components/menu/menu";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import Footer from "./components/footer/footer";
import Content from "./components/content/content";
import ProductDetail from "./components/productdetail/productdetail";
import CartProvider from "./store/CartProvider";
import Cart from "./components/cart/cart";
import Checkout from "./components/cart/checkout";
import Failed from "./components/content/orders/failed";
import Success from "./components/content/orders/succes";


function App() {
    return (
        <CartProvider>
            <div className="App">
                <Menu/>
                <Breadcrumbs crumbs={[{name: 'home', link: '/'}]}/>
                <Routes>
                    <Route path="/" exact element={<Content/>}/>
                    <Route path="/productDetail/:productId" element={<ProductDetail/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/failed" element={<Success/>}/>
                    <Route path="/*" element={<section><div className={"container"}><h2>404: Pagina niet gevonden</h2><p>Deze pagina bestaat niet in het systeem.</p></div></section>}/>
                </Routes>
                <Footer/>
            </div>
        </CartProvider>
    );
}

export default App;