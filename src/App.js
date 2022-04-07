import './scss/app.scss';
import Menu from "./components/menu/menu";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import Navigation from "./components/content/navigation/navigation";
import Footer from "./components/footer/footer";


function App() {
    return (
        <div className="App">
            <Menu />
            <Breadcrumbs />
            <Navigation />
            <Footer />
        </div>
    );
}

export default App;