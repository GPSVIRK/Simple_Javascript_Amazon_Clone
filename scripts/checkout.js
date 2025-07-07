import { cart , removeFromCart , calculateCartQuantity , updateProductQuantity , updateDeliveryOptionId } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js"; //singe dot means current folder
import { deliveryOptions , findDeliveryOption } from "../data/deliverOptions.js";
import { dayCalculator } from "./utils/dayCalculator.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; //we used a default export, its for when you want to export only one thing, there is only one default export allowed, the normal version is called named export

updateCartQuantity();

renderOrderSummary(); //its better to render the whole page again whenever an update occurs instead of uding the dom to update specific elements

function renderOrderSummary(){
	let cartSummaryHTML = '';

	cart.forEach((cartItem) => {
		const matchingProduct = products.find((productObj) => {return productObj.id === cartItem.productId;});

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

			});
		});

	document.querySelectorAll('.js-quantity-input')
		.forEach((inputBox) => {
			inputBox.addEventListener('keydown' , (keyDownEvent) => {

				if(keyDownEvent.key === 'Enter'){
					const {productId} = inputBox.dataset;
					changeEditingState(productId);
					saveNewQuantity(productId);
				}

			});
		});

} //since we have to regenerate all the html we also have to regenerate all the event listeners

function updateCartQuantity(){
	document.querySelector('.js-cart-quantity')
		.innerText = `${calculateCartQuantity()} items`;
}

function saveNewQuantity(productId){
	const newQuantity = extractNewQuantity(productId);
	
	if(newQuantity <= 0 || newQuantity > 1000){
		return;
	}

	document.querySelector(`.js-quantity-label-${productId}`)
		.innerText = newQuantity;

	updateProductQuantity(productId, newQuantity);

	updateCartQuantity();
}

function changeEditingState (productId){
	const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);

	if (cartItemContainer.classList.contains('is-editing-quantity')){
		cartItemContainer.classList.remove('is-editing-quantity');
	} else {
		cartItemContainer.classList.add('is-editing-quantity');
	}
}

function extractNewQuantity(productId){
	const newQuantityInput = document.querySelector(`.js-quantity-input-${productId}`);
	const newQuantity = Number(newQuantityInput.value);
	newQuantityInput.value = '';

	return newQuantity;
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