import React, {useEffect, useState} from "react";
import {Range, getTrackBackground} from "react-range";

// THIS FUNCTIONS SETS A CURRENCY SYMBOL IN THE PRICE FILTER INPUT FIELD
(function ($) {
    $.fn.currencyInput = function () {
        this.each(function () {
            var wrapper = $("<div class='currency-input' />");
            $(this).wrap(wrapper);
            $(this).before("<span class='currency-symbol'>€</span>");
            $(this).change(function () {
                var min = parseFloat($(this).attr("min"));
                var max = parseFloat($(this).attr("max"));
                var value = this.valueAsNumber;
                if (value < min)
                    value = min;
                else if (value > max)
                    value = max;
                $(this).val(value.toFixed(0));
            });
        });
    };
})(jQuery);

$(document).ready(function () {
    $('input.currency').currencyInput();
});

const Price = (props) => {
    const STEP = 1;
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [values, setValues] = useState([0, 100]);

    // THIS EFFECT TAKES PLACE WHEN THE MINVALUE AND MAXVALUE OF THE PRODUCTS IS SEND THREW BY ITS PARENT
    useEffect(() => {
        setValues([props.minValue, props.maxValue]);
        setMinValue(props.minValue);
        setMaxValue(props.maxValue);
    },[props.minValue, props.maxValue]);

    // THIS FUNCTION SENDS THE PRICE RANGE TO ITS PARENT WHEN THE MOUSE IS RELEASED
    useEffect(() => {
        let timeOut = setTimeout(() => {
            props.setPriceRange(values);
        }, 500);

        return () => {
            clearTimeout(timeOut);
        }
    }, [values]);

    return (
        <>
            <h4>Prijs</h4>
            <div className={"price"}>
                <div className={"price-range"}>
                    <input className={"currency"} type={"number"} name={"price_from"} step={1} min={0} value={values[0]} onChange={(value) => { setValues((prevValue) => [value.target.value, prevValue[1]])}} />
                    <p>tot</p>
                    <input className={"currency"} type={"number"} name={"price_to"} step={1} min={0} value={values[1]} onChange={(value) => { setValues((prevValue) => [prevValue[0], value.target.value])}}/>
                </div>
                <Range
                    values={values}
                    step={STEP}
                    min={minValue}
                    max={maxValue}
                    onChange={values => {
                        setValues(values);
                    }}
                    renderTrack={({props, children}) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "50px",
                                display: "flex",
                                width: "100%"
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "5px",
                                    width: "calc(100% - 26px)",
                                    marginLeft: "13px",
                                    marginTop: "15px",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values,
                                        colors: ["#ccc", "#823557", "#ccc"],
                                        min: minValue,
                                        max: maxValue
                                    }),
                                    alignSelf: "center"
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({props, isDragged}) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "24px",
                                width: "24px",
                                borderRadius: "50px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                            }}
                        >
                            <div
                                style={{
                                    height: "16px",
                                    width: "5px",
                                    backgroundColor: isDragged ? "#fff" : "#fff"
                                }}
                            />
                        </div>
                    )}
                />
            </div>
        </>
    );
}

export default Price;