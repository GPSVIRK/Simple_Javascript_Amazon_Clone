import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';

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
					src="images/ratings/rating-${productObj.rating.stars*10}.png">
				<div class="product-rating-count link-primary">
					${productObj.rating.count}
				</div>
			</div>

			<div class="product-price">
				$${(productObj.priceCents/100).toFixed(2)}
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

document.querySelectorAll('.js-add-to-cart-button')
	.forEach((buttonElement) => {
		let isAddedTextAppear = false;
		let timeoutId;
		
		buttonElement.addEventListener('click', () => {
			const { productId } = buttonElement.dataset;

			const addedElem = document.querySelector(`.js-added-${productId}`);
			addedElem.classList.add('added-text-appear');

			if(!isAddedTextAppear){
				timeoutId = setTimeout(() => {
						addedElem.classList.remove('added-text-appear');
					}, 2000);
				isAddedTextAppear = true;
			} else {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
						addedElem.classList.remove('added-text-appear');
					}, 2000);
			}
			

			let matchingItem;

			cart.forEach((item) => {
				if(productId === item.productId){
					matchingItem = item;
				}
			});

			const quantity = Number(document.querySelector(`.js-quantitiy-selector-${productId}`).value);

			if(matchingItem) matchingItem.quantity += quantity;
			else{
				cart.push({
					productId,
					quantity
				});
			}

			let cartQuantity = 0;

			cart.forEach((item) => {
				cartQuantity += item.quantity;
			});

			document.querySelector('.js-cart-quantitiy')
				.innerHTML = cartQuantity;
		})
	});

