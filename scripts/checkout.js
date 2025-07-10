import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckOutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([ // this is so that we can do all the promises at once instead of one by one 
    loadProductsFetch(),// it returns a promise directly
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    renderCheckOutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});



/*
Promise.all([ // this is so that we can do all the promises at once instead of one by one 
    new Promise((resolve) => { 
        loadProducts(() => {
            resolve();
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    renderCheckOutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// new Promise((resolve) => { //callbacks like below cause a lot of nesting, so this is better
//     loadProducts(() => {
//         resolve();
//     });
// }).then(() => {
//     renderCheckOutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });


// loadProducts(() => {
//     renderCheckOutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });
