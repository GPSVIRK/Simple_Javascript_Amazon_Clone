import { cart } from "../../data/cart-class.js";
import { renderOrderSummary } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckOutHeader } from "./checkoutHeader.js";

export function renderCheckoutPageIFCART(){
	renderCheckOutHeader();
	renderOrderSummary();
	renderPaymentSummary();
	if(cart.calculateCartQuantity() === 0){
		emptyCartHTML();
	}
}

function emptyCartHTML(){
	const emptyCartHTML = `
		<div>Your cart is empty</div>
		<a href="amazon.html">
			<button class = "button-primary view-products">View products</button>
		</a>
	`;

	document.querySelector('.js-orders-summary')
		.innerHTML = emptyCartHTML;

	document.querySelector('.js-place-order-button')
		.setAttribute('disabled','');
}
