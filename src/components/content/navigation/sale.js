const Sale = (props) => {

    // THIS FUNCTION SENDS THE SALE BTN STATUS TO ITS PARENT WHEN IT CHANGES
    const saleBtnHandler = (event) => {
        props.sale(event.target.checked);
    }

    return (
        <>
            <h4>Aanbieding</h4>
            <label className="switch">
                <input type="checkbox" onChange={saleBtnHandler} />
                <span className="slider round"></span>
            </label>
        </>
    );
}

export default Sale;