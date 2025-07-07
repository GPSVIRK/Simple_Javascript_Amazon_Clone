export let cart = /*JSON.parse(localStorage.getItem('cart')) ||*/ [
	{
		productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
		quantity: 2,
		deliveryOptionId: '1'
	},
	{
		productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
		quantity: 1,
		deliveryOptionId: '2'
	}
];

function saveToStorage(){
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
	const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

	const quantity = Number(document.querySelector(`.js-quantitiy-selector-${productId}`).value);

	if(matchingItem) {
		matchingItem.quantity += quantity;
	} 
	else{
		cart.push({
			productId,
			quantity,
			deliveryOptionId: '1'
		});
	}

	saveToStorage();
}

export function removeFromCart (productId){
	const newCart = cart.filter((cartItem) => {return cartItem.productId !== productId});

	cart = newCart;

	saveToStorage();
}

export function calculateCartQuantity(){
	let cartQuantity = 0;

	cart.forEach((cartItem) => {
		cartQuantity += cartItem.quantity;
	});

	return cartQuantity;
}

export function updateProductQuantity(productId, newQuantity){
	for(let i=0 ; i<cart.length ; i++){
		if(cart[i].productId === productId){
			cart[i].quantity = newQuantity;
			break;
		}
	}

	saveToStorage();
}

export function updateDeliveryOptionId (productId, deliveryOptionId){
	const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

	matchingItem.deliveryOptionId = deliveryOptionId;

	saveToStorage();
}