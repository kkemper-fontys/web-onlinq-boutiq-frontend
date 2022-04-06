import './scss/app.scss';
import Menu from "./components/menu/menu";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";
import Navigation from "./components/navigation/navigation";


function App() {
    return (
        <div className="App">
            <Menu />
            <Breadcrumbs />
            <Navigation />
        </div>
    );
}

export default App;