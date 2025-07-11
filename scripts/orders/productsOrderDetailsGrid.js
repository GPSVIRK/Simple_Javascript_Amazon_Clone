import { findProduct } from "../../data/products.js";
import { cart } from "../../data/cart-class.js";
import { dateFormatOrdersPage } from "../utils/dayCalculator.js";
import { renderOrderHeader } from "./orderheader.js";

export function productsOrderDetails(orderDetails){
	let orderGridHTML = '';

	orderDetails.products.forEach((orderedProductDetails) => {
		const productDetails = findProduct(orderedProductDetails.productId);
		orderGridHTML += `
			<div class="product-image-container">
				<img src="${productDetails.image}">
			</div>

			<div class="product-details">
				<div class="product-name">
					${productDetails.name}
				</div>
				<div class="product-delivery-date">
					Arriving on: ${dateFormatOrdersPage(orderedProductDetails.estimatedDeliveryTime)}
				</div>
				<div class="product-quantity">
					Quantity: ${orderedProductDetails.quantity}
				</div>
				<button class="buy-again-button button-primary js-buy-again js-buy-again-${orderedProductDetails.productId}"
				data-product-id = "${orderedProductDetails.productId}">
					<img class="buy-again-icon" src="images/icons/buy-again.png">
					<span class="buy-again-message">Buy it again</span>
				</button>
			</div>

			<div class="product-actions">
				<a href="tracking.html?orderId=${orderDetails.id}&productId=${orderedProductDetails.productId}">
					<button class="track-package-button button-secondary">
						Track package
					</button>
				</a>
			</div>
		`;
	});

	return orderGridHTML;
}