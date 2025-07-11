import { findOrder } from "../../data/orders.js";
import { findProduct } from "../../data/products.js";
import { arrivalDateTrackingPage } from "../utils/dayjsCode.js";

export function trackingPageHTML(){
	const url  = new URL(window.location.href);
	const orderId = url.searchParams.get('orderId');
	const productId = url.searchParams.get('productId');

	const productDetails = findProduct(productId);
	const orderDetails = findOrder(orderId);
	const trackingPageHTML = `
		<a class="back-to-orders-link link-primary" href="orders.html">
			View all orders
		</a>

		<div class="delivery-date">
			Arriving on ${arrivalDateTrackingPage(orderDetails.products,productId)}
		</div>

		<div class="product-info">
			${productDetails.name}
		</div>

		<div class="product-info">
			Quantity: ${productQuantityFromOrder(orderDetails,productId)}
		</div>

		<img class="product-image" src="${productDetails.image}">

		<div class="progress-labels-container">
			<div class="progress-label">
				Preparing
			</div>
			<div class="progress-label current-status">
				Shipped
			</div>
			<div class="progress-label">
				Delivered
			</div>
		</div>

		<div class="progress-bar-container">
			<div class="progress-bar"></div>
		</div>
	`;

	document.querySelector('.js-order-tracking')
		.innerHTML = trackingPageHTML;
}

function productQuantityFromOrder(orderDetails,productId){
	const orderedProductDetails = orderDetails.products.find((orderedProductDetails) => orderedProductDetails.productId === productId);

	return orderedProductDetails.quantity;
}