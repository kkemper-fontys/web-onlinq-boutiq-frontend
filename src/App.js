import './scss/app.scss';
import {Routes, Route} from 'react-router-dom';
import Menu from "./components/menu/menu";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import Footer from "./components/footer/footer";
import Content from "./components/content/content";
import ProductDetail from "./components/productdetail/productdetail";


function App() {
    return (
        <div className="App">
            <Menu/>
            <Breadcrumbs crumbs={[{name: 'home', link: '/'}]}/>
            <Routes>
                <Route path="/" exact element={<Content/>} />
                <Route path="/productDetail/:productId" element={<ProductDetail />} />
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;