import { percentageOfTimeLeft } from "../utils/dayjsCode";

export function progressBarUpdater(){
	const progressBarElem = document.querySelector('.progress-bar');

	progressBarElem.styles.width = `${percentageOfTimeLeft()}%`;

	if(percentageOfTimeLeft() === 100){
		document.querySelector('.js-orders-tracking')
			.innerHTML = `
				<a class="back-to-orders-link link-primary" href="orders.html">
					View all orders
				</a>
				<div class="go-away">This order is completed! go away please.</div>
			`;
	}
}

progressBarUpdater();
setInterval(progressBarUpdater, 3600000);