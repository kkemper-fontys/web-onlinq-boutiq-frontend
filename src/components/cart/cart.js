import React, {useContext, useEffect, useRef, useState} from "react";

import CartContext from "../../store/cart-context";
import {Link} from "react-router-dom";
import {useFetch} from "../../hooks/use-fetch";

const Cart = () => {
    // SETTING UP GLOBAL STATES
    const {fetchData, loading} = useFetch();
    const shippingCost = 750;

    // SETTING UP CART STATES
    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount;
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    // PRICE DATA
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);

    // COUPON DATA
    const [coupons, setCoupons] = useState([]);
    const [couponErrorMessage, setCouponErrorMessage] = useState("");
    const [couponStatus, setCouponStatus] = useState("");
    const couponRef = useRef();
    const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

    // THIS FUNCTIONS CHECKS IF COUPONS USED IN AN OLD SESSION ARE STILL USABLE (AFTER REFRESHING THE PAGE)
    const checkOldCouponHandler = async (oldCoupon) => {
        let alreadyUsed = false;
        coupons.map((coupon) => {
            if (coupon.code.toLowerCase() === oldCoupon.toLowerCase()) {
                alreadyUsed = true;
            }
        });
        if (alreadyUsed) {
            setCouponErrorMessage("Code nu al gebruikt");
            setCouponStatus("error");
        } else {
            const data = await fetchData(`api/coupons.json`, "GET", {}, `?code=${oldCoupon}`);
            const coupon = await Object.assign({}, data[0]);
            if (Object.keys(coupon).length === 0) {
                setCouponErrorMessage("Code bestaat niet!");
                setCouponStatus("error");
            } else {
                const timesUsed = +coupon.timesUsed;
                const timesUsable = +coupon.timesUsable;

                if (coupon.length === 0) {
                    setCouponErrorMessage("Geen goede code");
                    setCouponStatus("error");
                } else if (timesUsable !== 0 && timesUsed === timesUsable) {
                    setCouponErrorMessage("Code al te vaak gebruikt");
                    setCouponStatus("error");
                } else if (timesUsable === 0 || timesUsed < timesUsable) {
                    setCouponErrorMessage("");
                    setCouponStatus("success");
                    setCoupons((oldValue) => [...oldValue, coupon]);
                    cartCtx.addCoupon(coupon);
                }
            }
        }
    }

    // THIS FUNCTION CHECKS IF COUPON CAN STILL BE USED WHEN AN ITEM IS REMOVED FROM THE CART
    const checkCouponsOnItemRemove = async () => {
        let couponAmount = 0;
        await cartCtx.coupons.map((coupon) => {
            return couponAmount += +coupon.priceReduction
        });
        const localStorageCoupons = await localStorage.getItem('coupons');
        if (JSON.parse(localStorageCoupons).length > 0) {
            if ((cartCtx.totalAmount - couponAmount) < 0) {
                setCouponErrorMessage("Couponwaarde is hoger dan het te betalen bedrag, coupons verwijderd");
                setCouponStatus("error");
                setCoupons([]);
                localStorage.setItem('coupons', JSON.stringify([]));
            }
        }
    }

    // CHECK IF AN COUPON DOESN'T EXCEED THE TOTAL PRICE, ALREADY USED OR ISN'T VALID ANYMORE
    const checkCouponHandler = async (event) => {
        event.preventDefault();
        let alreadyUsed = false;
        coupons.map((coupon) => {
            if (coupon.code.toLowerCase() === couponRef.current.value.toLowerCase()) {
                alreadyUsed = true;
            }
        });
        if (alreadyUsed) {
            setCouponErrorMessage("Code nu al gebruikt");
            setCouponStatus("error");
        } else {
            const data = await fetchData(`api/coupons.json`, "GET", {}, `?code=${couponRef.current.value}`);
            const coupon = Object.assign({}, data[0]);
            if (Object.keys(coupon).length === 0) {
                setCouponErrorMessage("Code bestaat niet!");
                setCouponStatus("error");
            } else {
                const timesUsed = +coupon.timesUsed;
                const timesUsable = +coupon.timesUsable;

                if (coupon.length === 0) {
                    setCouponErrorMessage("Geen goede code");
                    setCouponStatus("error");
                } else if (timesUsable !== 0 && timesUsed === timesUsable) {
                    setCouponErrorMessage("Code al te vaak gebruikt");
                    setCouponStatus("error");
                } else if (timesUsable === 0 || timesUsed < timesUsable) {
                    if ((subTotal * 100 - coupon.priceReduction) < 0) {
                        setCouponErrorMessage("Couponwaarde te hoog voor deze winkelmand");
                        setCouponStatus("error");
                    } else {
                        let tempCoupons = [...coupons, coupon];
                        setCouponErrorMessage("");
                        setCouponStatus("success")
                        setCoupons([...coupons, coupon]);
                        await cartCtx.addCoupon(coupon);
                        await addCouponToStorage(tempCoupons);
                    }
                }
            }
        }
        couponRef.current.value = "";
    }

    const addCouponToStorage = async (tempCoupons) => {
        await localStorage.setItem('coupons', JSON.stringify(tempCoupons));
    };

    // THIS EFFECT TAKES PLACE WHEN THE COUPONS OR TOTALAMOUNT CHANGES AND SETS THE NEW TOTAL AND SUBTOTAL
    useEffect(() => {
        let amount = 0;
        let percentage = 0;
        coupons.map((coupon) => {
            if (coupon.priceReduction > 0) {
                const priceReduction = +coupon.priceReduction;
                amount += priceReduction;
            } else {
                percentage += coupon.percentageReduction;
            }
        });
        checkCouponsOnItemRemove().then();
        setSubTotal(((totalAmount * ((100 - percentage) / 100) - amount) / 100));
        setTotal(((totalAmount * ((100 - percentage) / 100) + shippingCost - amount) / 100));
    }, [coupons, totalAmount]);


    // THIS EFFECT TAKES PLACE WHEN THE PAGE REFRESHES AND GETS THE COOKIES FROM LOCALSTORAGE AND CHECKS THEM
    useEffect(() => {
        if (!isInitiallyFetched) {
            if (!localStorage.getItem('coupons')) {
                localStorage.setItem('coupons', JSON.stringify([]));
            }
            let prev_items = JSON.parse(localStorage.getItem('coupons'));
            prev_items.map((coupon) => checkOldCouponHandler(coupon.code));
            setIsInitiallyFetched(true);
        }
    }, []);

    // HANDLES THE '+' BUTTON
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    }

    // HANDLES THE '-' BUTTON
    const cartItemRemoveHandler = async (id) => {
        await cartCtx.removeItem(id);
    }

    // HANDLES THE 'DELETE' BUTTON
    const cartItemDeleteHandler = async (id) => {
        await cartCtx.deleteItem(id);
    }

    return (
        <section className={"cart"}>
            <div className={"container"}>
                <div className={"cart-content"}>
                    {numberOfCartItems > 0 &&
                    <div className={"cart-content-items"}>
                        {cartCtx.items.map((item) => (
                            <div key={item.id} className={"cart-content-items-item"}>
                                <Link to={`/productDetail/${item.id}`}>
                                    <div className={"cart-content-items-item-image"}>
                                        {item.images !== undefined &&
                                        <img src={`https://localhost:8000/uploads/files/${item.images}`}/>
                                        }
                                        {item.images === undefined  &&
                                        <img src={"/images/products/placeholder.jpg"}/>
                                        }
                                    </div>
                                </Link>
                                <Link to={`/productDetail/${item.id}`} className={"cart-content-items-item-value"}>
                                    <div className={"wrapper"}>
                                        <div className={"cart-content-items-item-product"}>
                                            <div className={"cart-content-items-item-product-tag"}>
                                                {item.subtitle}
                                            </div>
                                            <div className={"cart-content-items-item-product-name"}>
                                                {item.name}
                                            </div>
                                        </div>
                                        <div className={"cart-content-items-item-price"}>
                                            {`€ ${(item.price / 100).toFixed(2).replace(".", ",")}`}
                                        </div>
                                    </div>
                                </Link>
                                <div className={"cart-content-items-item-amount"}>
                                    <div className={"cart-content-items-item-amount-delete"}>
                                        <i className="fa-light fa-trash-can"
                                           onClick={cartItemDeleteHandler.bind(null, item.id)}/>
                                    </div>
                                    <button name={"addcoupon"} className={"cart-minbtn"}
                                            onClick={cartItemRemoveHandler.bind(null, item.id)}>
                                        <i className="fa-light fa-minus"/>
                                    </button>
                                    {item.amount}
                                    <button name={"addcoupon"} className={"cart-plusbtn"}
                                            onClick={cartItemAddHandler.bind(null, item)}>
                                        <i className="fa-light fa-plus"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                    {numberOfCartItems === 0 &&
                    <div className={"cart-content-items"}>
                        <div className={"cart-content-items-item cart-content-items-item-top"}>
                            <h4>Geen producten</h4>
                            Er staan momenteel geen producten in je winkelmandje!
                        </div>
                    </div>
                    }
                    {numberOfCartItems > 0 &&
                    <div className={"cart-content-info"}>


                        <h4>Cadeaukaart of coupon invoeren</h4>
                        {couponErrorMessage !== "" &&
                        <p className={"errorMessage"}>{couponErrorMessage}</p>
                        }
                        <form onSubmit={checkCouponHandler}>
                            <div className={"cart-content-info-table"}>
                                <input name={"coupon"}
                                       type={"text"}
                                       className={`cart-content-info-table-coupon ${couponStatus}`}
                                       placeholder={"Vul hier uw code in"}
                                       ref={couponRef}
                                />
                                <button name={"addcoupon"} type={"submit"} className={"cart-plusbtn"}
                                        onClick={checkCouponHandler}>
                                    <i className="fa-light fa-plus"/>
                                </button>
                            </div>
                        </form>
                        <div className={"cart-content-info-table"}>
                            <div className={"cart-content-info-table-totalproducts"}>
                                <b>Totaal producten
                                    ({numberOfCartItems})</b>
                            </div>
                            <div
                                className={"cart-content-info-table-price"}>{`€ ${(totalAmount / 100).toFixed(2).replace(".", ",")}`}</div>
                        </div>
                        {coupons.length > 0 &&
                        coupons.map((coupon) => {
                            if (coupon.priceReduction > 0) {
                                return (
                                    <div key={coupon.id} className={"cart-content-info-table"}>
                                        <div className={"cart-content-info-table-discount"}>Korting ({coupon.code})
                                        </div>
                                        <div className={"cart-content-info-table-discountprice"}>-
                                            € {(coupon.priceReduction / 100).toFixed(2).replace(".", ",")}</div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={coupon.id} className={"cart-content-info-table"}>
                                        <div className={"cart-content-info-table-discount"}>Korting ({coupon.code})
                                        </div>
                                        <div className={"cart-content-info-table-discountprice"}>-
                                            {coupon.percentageReduction}%
                                        </div>
                                    </div>
                                )
                            }
                        })
                        }
                        <div className={"cart-content-info-table cart-content-info-table-linebefore"}>
                            <div className={"cart-content-info-table-subtotal"}><b>Subtotaal</b></div>
                            <div className={"cart-content-info-table-subtotal-price"}>
                                <b>{`€ ${subTotal.toFixed(2).replace(".", ",")}`}</b></div>
                        </div>
                        <div className={"cart-content-info-table cart-content-info-table-lineafter"}>
                            <div className={"cart-content-info-table-shipping"}>Verzendkosten</div>
                            <div className={"cart-content-info-table-shipping-cost"}>
                                {`€ ${(shippingCost / 100).toFixed(2).replace(".", ",")}`}
                            </div>
                        </div>
                        <div className={"cart-content-info-table"}>
                            <div className={"cart-content-info-table-total"}><b>Totaal (incl. BTW)</b></div>
                            <div className={"cart-content-info-table-total-price"}>
                                <b>{`€ ${total.toFixed(2).replace(".", ",")}`}</b>
                            </div>
                        </div>
                        <Link to={"/checkout"}>
                            <button className={"cart-content-info-order"}>Ik ga bestellen</button>
                        </Link>
                        <Link to={"/"}>
                            <button className={"btn cart-content-info-toshop"}>Of verder winkelen</button>
                        </Link>
                    </div>
                    }
                    {numberOfCartItems === 0 &&
                    <div className={"cart-content-info"}>
                        <Link to={"/"}>
                            <button className={"btn cart-content-info-toshop single"}>Verder winkelen</button>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Cart;