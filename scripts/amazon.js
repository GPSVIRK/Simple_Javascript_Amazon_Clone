import { cart, addToCart , calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';

updateCartQuantity();

products.forEach((productObj) => {
	const html = `
		<div class="product-container">
			<div class="product-image-container">
				<img class="product-image"
					src="${productObj.image}">
			</div>

			<div class="product-name limit-text-to-2-lines">
				${productObj.name}
			</div>

			<div class="product-rating-container">
				<img class="product-rating-stars"
					src="${productObj.getStarURL()}">
				<div class="product-rating-count link-primary">
					${productObj.rating.count}
				</div>
			</div>

			<div class="product-price">
				${productObj.getPrice()}
			</div>

			<div class="product-quantity-container">
				<select class="js-quantitiy-selector-${productObj.id}">
					<option selected value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
			</div>

			${productObj.extraInfoHTML()}

			<div class="product-spacer"></div>

			<div class="added-to-cart js-added-${productObj.id}">
				<img src="images/icons/checkmark.png">
				Added
			</div>

			<button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = "${productObj.id}">
				Add to Cart
			</button>
		</div>
	`;

	productsHTML += html;
});

document.querySelector('.js-products-grid')
	.innerHTML = productsHTML;


const addedButtonStateMap = new Map();

function showAddedText(productId){

	const addedElem = document.querySelector(`.js-added-${productId}`);

	addedElem.classList.add('added-text-appear');

	const addedTextState = addedButtonStateMap.get(productId) || {
		isAddedTextAppear: false,
		timeoutId: null
	}

	if(!addedTextState.isAddedTextAppear){

		addedTextState.timeoutId = setTimeout(() => {
									addedElem.classList.remove('added-text-appear');
									isAddedTextAppear = false;
								}, 2000);

		addedTextState.isAddedTextAppear = true;
	} else {

		clearTimeout(addedTextState.timeoutId);

		addedTextState.timeoutId = setTimeout(() => {
									addedElem.classList.remove('added-text-appear');
									isAddedTextAppear = false;
								}, 2000);
	}

	addedButtonStateMap.set(productId, addedTextState);
}

function updateCartQuantity(){
	document.querySelector('.js-cart-quantitiy')
		.innerHTML = calculateCartQuantity();
}

document.querySelectorAll('.js-add-to-cart-button')
	.forEach((buttonElement) => {
		buttonElement.addEventListener('click', () => {
			const { productId } = buttonElement.dataset;

			showAddedText(productId);

			addToCart(productId);

			updateCartQuantity();
		})
	});

