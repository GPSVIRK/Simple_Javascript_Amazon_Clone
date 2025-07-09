import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckOutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";


loadProducts(() => {
    renderCheckOutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
