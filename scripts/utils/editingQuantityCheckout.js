import { cart } from "../../data/cart-class.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";

export function saveNewQuantity(productId){
	const newQuantity = extractNewQuantity(productId);
	
	if(newQuantity <= 0 || newQuantity > 1000){
		return;
	}

	document.querySelector(`.js-quantity-label-${productId}`)
		.innerText = newQuantity;

	cart.updateProductQuantity(productId, newQuantity);

	renderPaymentSummary();
}

export function changeEditingState (productId){
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