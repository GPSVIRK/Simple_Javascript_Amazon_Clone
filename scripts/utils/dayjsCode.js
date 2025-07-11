import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; //we used a default export, its for when you want to export only one thing, there is only one default export allowed, the normal version is called named export

function isWeekend(dateObj){
	return dateObj.format('dddd') === 'Saturday' || dateObj.format('dddd') === 'Sunday';
}

export function dayCalculator(deliveryOption){
	const today = dayjs();

	let daysToAdd = deliveryOption.deliveryDays;

	let deliveryDate = today;

	while(daysToAdd > 0){
		deliveryDate = deliveryDate.add(1,'days');
		if (!isWeekend(deliveryDate)){
			daysToAdd--;
		}
	}

	const dateString = deliveryDate.format('dddd, MMMM D');

	return dateString;
}

export function dateFormatOrdersPage(dateTime){
	const dayjsDateTime = dayjs(dateTime);

	const dateString = dayjsDateTime.format('MMMM D');
	
	return dateString;
}

export function arrivalDateTrackingPage(orderProducts,productId){
	const orderedProductDetails = orderProducts.find((orderedProductObj) => orderedProductObj.productId === productId);

	const arrivalTime = dayjs(orderedProductDetails.estimatedDeliveryTime);

	const dateString = arrivalTime.format('dddd, MMMM D');

	return dateString;
}

export function percentageOfTimeLeft(orderDate, arrivalDate){
	const dayjsOrderDate = dayjs(orderDate);
	const dayjsArrivalDate = dayjs(arrivalDate);
	const today = dayjs();

	const remainingArrivalDays = dayjsArrivalDate.diff(today,'day',true);
	if (remainingArrivalDays < 0){
		return null;
	}
	const totalArrivalDays =  dayjsArrivalDate.diff(dayjsOrderDate,'day',true);

	const percentage = round(((totalArrivalDays - remainingArrivalDays)/totalArrivalDays)*10000)/10000;

	return percentage;
}