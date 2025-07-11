import { orders } from "../../data/orders.js";
import { makeOrderHeader } from "./orderheader.js";
import { productsOrderDetails } from "./productsOrderDetailsGrid.js";

export function renderOrderPage(){
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