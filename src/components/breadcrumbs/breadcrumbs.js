import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {crumbActions} from "../../stores/crumb";
import {useEffect, useState} from "react";

const Breadcrumbs = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {crumbs} = useSelector((state) => state);
    const [currentCrumbs, setCurrentCrumbs] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(crumbActions.addCrumb({name:'test',link: 'test2'}));
        setCurrentCrumbs(crumbs);
    }, []);

    return (
        <div className={"breadcrumbs"}>
            <div className={"container"}>
                {location.pathname !== '/' &&
                <button onClick={() => navigate(-1)} className={"btn"}><i className="icon fa-solid fa-chevron-left"/>Terug
                </button>}
                {currentCrumbs.length !== 0 && console.log(currentCrumbs)}
                {currentCrumbs.length !== 0 && currentCrumbs.crumbs.map((crumb) => (<Link to={crumb.link}>{crumb.name}</Link>))}
            </div>
        </div>
    );
}

export default Breadcrumbs;