import './scss/app.scss';
import Menu from "./components/menu/menu";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import Footer from "./components/footer/footer";
import Content from "./components/content/content";


function App() {
    return (
        <div className="App">
            <Menu />
            <Breadcrumbs />
            <Content />
            <Footer />
        </div>
    );
}

export default App;