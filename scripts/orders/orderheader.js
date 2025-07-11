import { formatCurrency } from "../utils/money.js";
import { dateFormatOrdersPage } from "../utils/dayCalculator.js";

export function makeOrderHeader(orderDetails){
	const orderHeaderHTML = `
		<div class="order-header">
			<div class="order-header-left-section">
				<div class="order-date">
					<div class="order-header-label">Order Placed:</div>
					<div>${dateFormatOrdersPage(orderDetails.orderTime)}</div>
				</div>
				<div class="order-total">
					<div class="order-header-label">Total:</div>
					<div>$${formatCurrency(orderDetails.totalCostCents)}</div>
				</div>
			</div>

			<div class="order-header-right-section">
				<div class="order-header-label">Order ID:</div>
				<div>${orderDetails.id}</div>
			</div>
		</div>
	`;

	return orderHeaderHTML;
}