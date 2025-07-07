import { cart , removeFromCart , calculateCartQuantity , updateDeliveryOptionId } from "../../data/cart.js";
import { findProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js"; 
import { deliveryOptions , findDeliveryOption } from "../../data/deliverOptions.js";
import { dayCalculator } from "../utils/dayCalculator.js";
import { saveNewQuantity, changeEditingState } from "../utils/editingQuantityCheckout.js";
import { renderPaymentSummary } from "./paymentSummary.js"; //singe dot means current folder

/*its better to render the whole page again whenever an update occurs instead of using the dom to update specific elements, this process is called  MVC=Model View Controller
in MVC we split our code into 3 parts, the Model which saves and manages the data, all the code in the data folder
2- the View, which takes the data and displays it on the page, i.e taking the data and putting it in the html
3- the Controller which is all the event listeners, and it makes the page interactive
these three elements interact in a loop, the controller updates the model and then causes the view to update and the controller to be interactive again*/

export function renderOrderSummary(){
	updateCartQuantity();
	let cartSummaryHTML = '';

	cart.forEach((cartItem) => {
		const matchingProduct = findProduct(cartItem.productId);

		//input type radio selector is the bubble which fills, if some have the same name then you can only select one of them, but if two or more all have different names then you can select all of them, thats why we have to change the delivery option number in the name attribute in 

		const dateString = dayCalculator(findDeliveryOption(cartItem.deliveryOptionId));

		cartSummaryHTML += `
			<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
				<div class="delivery-date js-delivery-date-${matchingProduct.id}">
					Delivery date: ${dateString}
				</div>

				<div class="cart-item-details-grid">
					<img class="product-image"
					src="${matchingProduct.image}">

					<div class="cart-item-details">
						<div class="product-name">
							${matchingProduct.name}
						</div>
						<div class="product-price">
							$${formatCurrency(matchingProduct.priceCents)}
						</div>
						<div class="product-quantity">
							<span>
								Quantity: 
								<span class="quantity-label js-quantity-label-${matchingProduct.id}">
									${cartItem.quantity}
								</span>
							</span>
							<span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
								Update 
							</span>
							<input class = "quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
							<span class="save-quantity-link link-primary js-save-link" data-product-id = "${matchingProduct.id}">
								Save
							</span>
							<span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
								Delete
							</span>
						</div>
					</div>

					<div class="delivery-options"> 
						<div class="delivery-options-title">
							Choose a delivery option:
						</div>
						${deliveryOptionsHTML(matchingProduct, cartItem)}
					</div>
				</div>
			</div>
		`;
	});

	document.querySelector('.js-orders-summary')
		.innerHTML = cartSummaryHTML;

	document.querySelectorAll('.js-delivery-option')
		.forEach((element) => {
			element.addEventListener('click', () => {
				const {productId , deliveryOptionId} = element.dataset;

				updateDeliveryOptionId(productId,deliveryOptionId);

				renderOrderSummary();

				renderPaymentSummary();
			});
		});

	document.querySelectorAll('.js-delete-link')
		.forEach((link) => {
			link.addEventListener('click', () => {
				const { productId } = link.dataset;
				removeFromCart(productId);
				const container = document.querySelector(`.js-cart-item-container-${productId}`);
				container.remove(); //every element gotten using the dom has this method, it allows us to remove the div or something
				updateCartQuantity();

				renderPaymentSummary();
			});
		});

	document.querySelectorAll('.js-update-link')
		.forEach((link) => {
			link.addEventListener('click' , () =>{

				const {productId} = link.dataset;
				changeEditingState(productId);

			});
		});

	document.querySelectorAll('.js-save-link')
		.forEach((link) => {
			link.addEventListener('click' , () => {

				const {productId} = link.dataset;
				changeEditingState(productId);
				saveNewQuantity(productId);
				updateCartQuantity();

			});
		});

	document.querySelectorAll('.js-quantity-input')
		.forEach((inputBox) => {
			inputBox.addEventListener('keydown' , (keyDownEvent) => {

				if(keyDownEvent.key === 'Enter'){
					const {productId} = inputBox.dataset;
					changeEditingState(productId);
					saveNewQuantity(productId);
					updateCartQuantity();
				}

			});
		});

} //since we have to regenerate all the html we also have to regenerate all the event listeners

function updateCartQuantity(){
	document.querySelector('.js-cart-quantity')
		.innerText = `${calculateCartQuantity()} items`;
}

function deliveryOptionsHTML(matchingProduct, cartItem){
	let html = '';

	deliveryOptions.forEach((deliveryOption) => {
		
		const dateString = dayCalculator(deliveryOption);

		const priceString = deliveryOption.priceCents === 0? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;

		const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

		html += `
			<div class="delivery-option js-delivery-option"
			data-product-id = "${matchingProduct.id}"
			data-delivery-option-id = "${deliveryOption.id}">
				<input type="radio" 
				${isChecked ? 'checked' : ''}
				class="delivery-option-input"
				name="delivery-option-${matchingProduct.id}">
				<div>
					<div class="delivery-option-date">
						${dateString}
					</div>
					<div class="delivery-option-price">
						${priceString} Shipping
					</div>
				</div>
			</div>
		`;

	});
	return html;
}