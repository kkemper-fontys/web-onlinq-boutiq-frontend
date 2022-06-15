import {Link} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import CartContext from "../../store/cart-context";
import {useFetch} from "../../hooks/use-fetch";

const Checkout = () => {
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

    // REFS FOR THE INPUT FIELD
    const nameInput = useRef();
    const addressInput = useRef();
    const zipcodeInput = useRef();
    const cityInput = useRef();
    const telephoneInput = useRef();
    const emailInput = useRef();

    // STATES FOR THE INPUT FIELD
    const [nameValue, setNameValue] = useState("");
    const [addressValue, setAddressValue] = useState("");
    const [zipcodeValue, setZipcodeValue] = useState("");
    const [cityValue, setCityValue] = useState("");
    const [telephoneValue, setTelephoneValue] = useState("");
    const [emailValue, setEmailValue] = useState("");

    // STATES FOR THE ERROR MESSAGES
    const [zipcodeError, setZipcodeError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

    // THIS EFFECTS TAKES PLACE ON PAGE ENTER AND CHECKS IF THERE ARE COUPONS IN THE CART CONTEXT
    useEffect(() => {
        setCoupons(cartCtx.coupons);
    }, []);

    // THIS EFFECT TAKES PLACE WHEN THE COUPONS CHANGES AND SETS THE NEW TOTAL AND SUBTOTAL
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
        setSubTotal(((totalAmount * ((100 - percentage) / 100) - amount) / 100));
        setTotal(((totalAmount * ((100 - percentage) / 100) + shippingCost - amount) / 100));
    }, [coupons]);

    // THIS EFFECT TAKES PLACE WHEN AN INPUTFIELD IS FILLED IN AND SETS THE DATABASE IN A COOKIE AND STATE
    useEffect(() => {
        if (isInitiallyFetched) {
            localStorage.setItem("naw", JSON.stringify({
                fullname: nameValue,
                address: addressValue,
                zipcode: zipcodeValue,
                city: cityValue,
                telephone: telephoneValue,
                email: emailValue
            }));
        } else {
            const data = JSON.parse(localStorage.getItem("naw"));
            setNameValue(data.fullname);
            setAddressValue(data.address);
            setZipcodeValue(data.zipcode);
            setCityValue(data.city);
            setTelephoneValue(data.telephone);
            setEmailValue(data.email);

            setIsInitiallyFetched(true);
        }
    }, [nameValue, addressValue, zipcodeValue, cityValue, telephoneValue, emailValue]);

    // THIS FUNCTION IS FOR ZIPCODE VALIDATION: NrNrNrNrLtrLtr
    const validateZipcode = (zipcode) => {
        let regExp = /\d\d\d\d[a-zA-Z][a-zA-Z]/;
        return regExp.test(zipcode);
    }

    // THIS FUNCTION IS FOR EMAIL VALIDATION
    const validateEmail = (email) => {
        let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regExp.test(email);
    }

    // THIS FUNCTIONS CLEARS ALL COOKIES
    const clearAllHandler = () => {
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('coupons', JSON.stringify([]));
        localStorage.setItem('naw', JSON.stringify([]));
    }

    // THIS FUNCTIONS VALIDATES THE INPUT FIELDS WHEN FORM IS SUBMITTED AND MAKES THE ORDER PENDING
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        if (!validateZipcode(zipcodeInput.current.value)) {
            setZipcodeError(true);
        } else if (!validateEmail(emailInput.current.value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
            setZipcodeError(false);
            const name = nameInput.current.value.split(" ");
            const customer = {
                firstName: name[0],
                lastName: name[1],
                email: emailInput.current.value,
                address: addressInput.current.value,
                zipcode: zipcodeInput.current.value,
                city: cityInput.current.value
            }
            const customerData = await fetchData(`api/customers`, 'POST', JSON.stringify(customer));

            const order = {
                customer: customerData['@id'],
                orderStatus: "Open",
                total: (total * 100).toString(),
                subtotal: (subTotal * 100).toString(),
                orderLines: []
            }

            const orderData = await fetchData(`api/orders`, 'POST', JSON.stringify(order));
            console.log(orderData);
            cartCtx.items.map(async (item) => {
                const orderLine = {
                    product: "/api/products/"+item.id,
                    price: item.price,
                    amount: item.amount,
                    master: orderData['@id']
                }

                const orderLineData = await fetchData(`api/order_lines`, 'POST', JSON.stringify(orderLine));
            });

            const orderUpdate = await fetchData(`api/orders/${orderData.id}`, 'PUT', JSON.stringify({orderStatus: "Payment pending"}));
            console.log(orderUpdate);

            const amount = (+orderData.total / 100).toFixed(2).toString();
            console.log(amount);
            const paymentUrl = await fetchData(`mollie`, 'POST', JSON.stringify({orderId: orderData.id, amount: amount}));
            clearAllHandler();
            window.open(paymentUrl.url, '_self');
            console.log(paymentUrl);
        }
    }

    return (
        <section className={"checkout"}>
            <form onSubmit={formSubmitHandler}>
                <div className={"container"}>
                    <div className={"checkout-content"}>
                        <div className={"checkout-content-naw"}>
                            <h4>Persoonlijke gegevens</h4>
                            <div className={"checkout-content-naw-data"}>
                                <input ref={nameInput}
                                       type={"text"}
                                       name={"name"}
                                       placeholder={"Naam*"}
                                       style={{width: "100%"}}
                                       value={nameValue}
                                       required={true}
                                       onChange={(value) => {
                                           setNameValue(value.target.value.charAt(0).toUpperCase() + value.target.value.slice(1))
                                       }}
                                />
                                <input ref={addressInput}
                                       type={"text"}
                                       name={"address"}
                                       placeholder={"Adres*"}
                                       style={{width: "100%"}}
                                       value={addressValue}
                                       required={true}
                                       onChange={(value) => {
                                           setAddressValue(value.target.value)
                                       }}
                                />
                                {zipcodeError &&
                                <p className={"error"} style={{width: "100%"}}>Geen geldige postcode</p>
                                }
                                <input ref={zipcodeInput}
                                       type={"text"}
                                       name={"zipcode"}
                                       placeholder={"Postcode*"}
                                       style={{width: "calc(34% - 30.1px)"}}
                                       value={zipcodeValue}
                                       maxLength={6}
                                       required={true}
                                       onChange={(value) => {
                                           setZipcodeValue(value.target.value.trim())
                                       }}
                                />
                                <input ref={cityInput}
                                       type={"text"}
                                       name={"city"}
                                       placeholder={"Woonplaats*"}
                                       style={{width: "calc(66% - 30.1px)"}}
                                       value={cityValue}
                                       required={true}
                                       onChange={(value) => {
                                           setCityValue(value.target.value.charAt(0).toUpperCase() + value.target.value.slice(1))
                                       }}
                                />
                                <input ref={telephoneInput}
                                       type={"tel"}
                                       name={"telephone"}
                                       placeholder={"Telefoonnummer"}
                                       style={{width: "100%"}}
                                       value={telephoneValue}
                                       onChange={(value) => {
                                           setTelephoneValue(value.target.value)
                                       }}
                                />
                                {emailError &&
                                <p className={"error"} style={{width: "100%"}}>Geen geldig e-mailadres</p>
                                }
                                <input ref={emailInput}
                                       type={"email"}
                                       name={"email"}
                                       placeholder={"E-mailadres*"}
                                       style={{width: "100%"}}
                                       value={emailValue}
                                       required={true}
                                       onChange={(value) => {
                                           setEmailValue(value.target.value)
                                       }}
                                />
                            </div>
                        </div>
                        <div className={"checkout-content-info"}>
                            <h4>Overzicht bestelling</h4>
                            <div className={"checkout-content-info-table"}>
                                <div className={"checkout-content-info-table-totalproducts"}>
                                    <b>Totaal producten
                                        ({numberOfCartItems})</b>
                                </div>
                                <div
                                    className={"checkout-content-info-table-price"}>{`€ ${(totalAmount / 100).toFixed(2).replace(".", ",")}`}</div>
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
                                <div
                                    className={"cart-content-info-table-shipping-cost"}>{`€ ${(shippingCost / 100).toFixed(2).replace(".", ",")}`}</div>
                            </div>
                            <div className={"checkout-content-info-table"}>
                                <div className={"checkout-content-info-table-total"}><b>Totaal (incl. BTW)</b></div>
                                <div className={"checkout-content-info-table-total-price"}>
                                    <b>{`€ ${total.toFixed(2).replace(".", ",")}`}</b></div>
                            </div>
                            <button className={"checkout-content-info-order"} type={"submit"}>Bestellen!</button>
                            <Link to={"/"}>
                                <button className={"btn checkout-content-info-toshop"}>Of verder winkelen</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Checkout;