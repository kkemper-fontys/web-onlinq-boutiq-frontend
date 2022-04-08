import './scss/app.scss';
import {Switch, Route} from 'react-router-dom';
import Menu from "./components/menu/menu";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import Footer from "./components/footer/footer";
import Content from "./components/content/content";
import ProductDetail from "./components/productdetail/productdetail";


function App() {
    return (
        <div className="App">
            <Menu/>
            <Breadcrumbs/>
            <Switch>
                <Route path="/" exact>
                    <Content/>
                </Route>
                <Route path="/productDetail/:productId">
                    <ProductDetail />
                </Route>
                <Route path="/cart">
                    {/*<Cart />*/}
                    {'hier komt de informatie van je cart'}
                </Route>
                <Route path="*">
                    {/*<NotFound />*/}
                    {'not found'}
                </Route>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;