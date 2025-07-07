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