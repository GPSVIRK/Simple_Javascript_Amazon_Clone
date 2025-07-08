function Cart(localStorageKey) { // functions that generate objects are named in PascalCase,we use these cuz we may need to make more than one of these objects
    const cart = {
        cartItems: (JSON.parse(localStorage.getItem(localStorageKey)) || []),

        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        findCartItem(productId){
            return this.cartItems.find((cartItem) => cartItem.productId === productId);
        },

        addToCart(productId){
            const matchingItem = this.findCartItem(productId);

            const quantity = Number(document.querySelector(`.js-quantitiy-selector-${productId}`).value);

            if(matchingItem) {
                matchingItem.quantity += quantity;
            } 
            else{
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionId: '1'
                });
            }

            this.saveToStorage();
        },

        removeFromCart (productId){
            const newCart = this.cartItems.filter((cartItem) => {return cartItem.productId !== productId});

            this.cartItems = newCart;

            this.saveToStorage();
        },

        calculateCartQuantity(){
            let cartQuantity = 0;

            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });

            return cartQuantity;
        },

        updateProductQuantity(productId, newQuantity){
            const matchingItem = this.findCartItem(productId);

            matchingItem.quantity = newQuantity;

            this.saveToStorage();
        },

        updateDeliveryOptionId (productId, deliveryOptionId){
            const matchingItem = this.findCartItem(productId);

            matchingItem.deliveryOptionId = deliveryOptionId;

            this.saveToStorage();
        }
    };

    return cart;
}

const cart = Cart('cart-oop');

/*we are using that localStorageKey so that when we load from or save to local storage we are saving in a different place for different objects*/