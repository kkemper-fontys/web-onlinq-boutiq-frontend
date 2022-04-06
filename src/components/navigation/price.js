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

const Price = () => {
    return (
        <>
            <h4>Prijs</h4>
            <div className={"price"}>
                <div className={"price-range"}>
                    <input className={"currency"} type={"number"} name={"price_from"} step={1} min={0} value={0}/>
                    <p>tot</p>
                    <input className={"currency"} type={"number"} name={"price_to"} step={1} min={0} value={0}/>
                </div>
            </div>
        </>
    );
}

export default Price;