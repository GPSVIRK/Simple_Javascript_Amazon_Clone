import { orders } from "../../data/orders.js";
import { makeOrderHeader } from "./orderheader.js";
import { productsOrderDetails } from "./productsOrderDetailsGrid.js";
import { cart } from "../../data/cart-class.js";

export function renderOrderPage(){
	document.querySelector('.js-cart-quantity')
		.innerText = cart.calculateCartQuantity();

	let orderGridHTML = '';

	orders.orderData.forEach((orderDetails) => {
		orderGridHTML += `
			<div class="order-container">
				${makeOrderHeader(orderDetails)}

				<div class="order-details-grid">
					${productsOrderDetails(orderDetails)}
				</div>
			</div>
		`;
	});

	document.querySelector('.js-orders-grid')
		.innerHTML = orderGridHTML;
}