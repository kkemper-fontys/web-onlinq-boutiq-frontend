import './scss/app.scss';
import Menu from "./components/menu/menu";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs";


function App() {
    return (
        <div className="App">
            <Menu />
            <Breadcrumbs />
        </div>
    );
}

export default App;