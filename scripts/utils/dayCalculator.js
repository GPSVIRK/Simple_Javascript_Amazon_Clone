import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; //we used a default export, its for when you want to export only one thing, there is only one default export allowed, the normal version is called named export

export function dayCalculator(deliveryOption){
	const today = dayjs().subtract(2,'days');
	
	let deliveryDate = today.add(
		deliveryOption.deliveryDays,
		'days'
	);

	if(deliveryDate.format('dddd') === 'Saturday'){
		deliveryDate = deliveryDate.add(2,'days');
	} else if (deliveryDate.format('dddd') === 'Sunday'){
		deliveryDate = deliveryDate.add(1,'days');
	}

	const dateString = deliveryDate.format('dddd, MMMM D');

	return dateString;
}