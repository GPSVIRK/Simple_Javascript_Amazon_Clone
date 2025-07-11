import { orders } from "../../data/orders.js";
import { renderOrderHeader } from "./orderheader.js";
import { productsOrderDetails } from "./productsOrderDetailsGrid.js";
import { cart } from "../../data/cart-class.js";
import { showAddedText } from "../utils/addedTextState.js";

export function renderOrderPage(){
	document.querySelector('.js-cart-quantity')
		.innerText = cart.calculateCartQuantity();

	let orderGridHTML = '';

	orders.orderData.forEach((orderDetails) => {
		orderGridHTML += `
			<div class="order-container">
				${renderOrderHeader(orderDetails)}

				<div class="order-details-grid">
					${productsOrderDetails(orderDetails)}
				</div>
			</div>
		`;
	});

	document.querySelector('.js-orders-grid')
		.innerHTML = orderGridHTML;

	document.querySelectorAll('.js-buy-again')
		.forEach((element) => {
			element.addEventListener('click', () => {
				const {productId} = element.dataset;
				cart.addToCart(productId);
				document.querySelector('.js-cart-quantity')
					.innerText = cart.calculateCartQuantity();

				const buyAgainButtonElem = document.querySelector(`.js-buy-again-${productId}`);
				showAddedText(productId,buyAgainButtonElem,addAddedText,removeAddedText);
			});
		});
}

function addAddedText(buyAgainButtonElem){
	buyAgainButtonElem.innerHTML = '&check; Added';
}

function removeAddedText(buyAgainButtonElem){
	buyAgainButtonElem.innerHTML = `<img class="buy-again-icon" src="images/icons/buy-again.png">
		<span class="buy-again-message">Buy it again</span>`;
}