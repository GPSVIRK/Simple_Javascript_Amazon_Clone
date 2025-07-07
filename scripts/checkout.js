import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckOutHeader } from "./checkout/checkoutHeader.js";

renderCheckOutHeader();
renderOrderSummary();
renderPaymentSummary();