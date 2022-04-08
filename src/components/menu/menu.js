const Menu = () => {
    return (
        <div className={"menu"}>
            <a className={"menu-item"}>Home</a>
            <a className={"menu-item"}>Over ons</a>
            <a className={"menu-item"}>Producten</a>
            <a className={"menu-item"}>Recepten</a>
            <a className={"menu-item"}>Contact</a>
            <img className={"menu-logo"} src={'/images/logo.png'}/>
        </div>
    );
}

export default Menu;