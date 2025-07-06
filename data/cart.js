export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage(){
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) => {

        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }

    });

    const quantity = Number(document.querySelector(`.js-quantitiy-selector-${productId}`).value);

    if(matchingItem) {
        matchingItem.quantity += quantity;
    } 
    else{
        cart.push({
            productId,
            quantity
        });
    }

	saveToStorage();
}

export function removeFromCart (productId){
	const newCart = cart.filter((cartItem) => {return cartItem.productId !== productId});

	cart = newCart;

	saveToStorage();
}