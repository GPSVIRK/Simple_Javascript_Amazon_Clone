import { cart } from "../../data/cart-class.js";
import { findProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { findDeliveryOption } from "../../data/deliverOptions.js";
import { orders } from "../../data/orders.js";

export function renderPaymentSummary(){
	let productPriceCents = 0;
	let shippingPriceCents = 0;

	cart.cartItems.forEach((cartItem) => {
		const product = findProduct(cartItem.productId);
		productPriceCents += product.priceCents * cartItem.quantity;

		const deliveryOption = findDeliveryOption(cartItem.deliveryOptionId);
		shippingPriceCents += deliveryOption.priceCents;
	});

	const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
	const taxCents = Math.round(totalBeforeTaxCents * 0.1);
	const totalCents = totalBeforeTaxCents + taxCents;

	const paymentSummaryHTML = `
		<div class="payment-summary-title">
			Order Summary
		</div>

		<div class="payment-summary-row">
			<div>
				Items (${cart.calculateCartQuantity()}):
			</div>
			<div class="payment-summary-money">
				$${formatCurrency(productPriceCents)}
			</div>
		</div>

		<div class="payment-summary-row">
			<div>
				Shipping &amp; handling:
			</div>
			<div class="payment-summary-money">
				$${formatCurrency(shippingPriceCents)}
			</div>
		</div>

		<div class="payment-summary-row subtotal-row">
			<div>
				Total before tax:
			</div>
			<div class="payment-summary-money">
				$${formatCurrency(totalBeforeTaxCents)}
			</div>
		</div>

		<div class="payment-summary-row">
			<div>
				Estimated tax (10%):
			</div>
			<div class="payment-summary-money">
				$${formatCurrency(taxCents)}
			</div>
		</div>

		<div class="payment-summary-row total-row">
			<div>
				Order total:
			</div>
			<div class="payment-summary-money">
				$${formatCurrency(totalCents)}
			</div>
		</div>

		<button class="place-order-button button-primary js-place-order-button">
			Place your order
		</button>
	`;

	document.querySelector('.js-payment-summary')
		.innerHTML = paymentSummaryHTML;

	document.querySelector('.js-place-order-button')
		.addEventListener('click', async () => {
			try{
				const response = await fetch('https://supersimplebackend.dev/orders', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						cart
					})
				});

				const order = await response.json();
				orders.addOrder(order);

			}catch(error){
				console.log('unexpected');
			}

			localStorage.removeItem('cart');

			window.location.href = 'orders.html'; // this will change the file path to that
		});
}

/*four types of requests:
	GET=get from backend
	POST=make the backend create something
	PUT=make the backend update something
	DELETE=make the backend delete something
*/