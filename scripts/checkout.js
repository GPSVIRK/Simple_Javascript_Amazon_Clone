import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckOutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";

new Promise((resolve) => { //callbacks like below cause a lot of nesting, so this is better
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderCheckOutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});


// loadProducts(() => {
//     renderCheckOutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });
