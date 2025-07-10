export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage(){
	localStorage.setItem('cart', JSON.stringify(cart));
}

function findCartItem(productId){
	return cart.find((cartItem) => cartItem.productId === productId);
}

export function addToCart(productId){
	const matchingItem = findCartItem(productId);

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
	const matchingItem = findCartItem(productId);

	matchingItem.deliveryOptionId = deliveryOptionId;

	saveToStorage();
}

export function loadCart(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
	console.log(xhr.response);

	func();
  });

  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}