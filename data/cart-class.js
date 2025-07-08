class Cart { // this is a class definition, its very similar to a function, but no parameters allowed, they have to be properties of the object itself
    #localStorageKey; //with the hash this turns into a private property, so that it cant be changed by outside the functions in the cart object, it cant be used anywhere except inside the object
//if a thing doesnt have a hash then it is a public thing
    cartItems  //you have to do it like this otherwise the below code will be run and will give an error every time you try to make a class

    constructor(localStorageKey) { // these parameters are recived as arguments to the class 'function' being called during creation
        this.#localStorageKey = localStorageKey;

        this.#loadFromStorage();
    }//this has to be named constructor, and it cannot return anything

    #loadFromStorage(){
        this.cartItems = (JSON.parse(localStorage.getItem(this.#localStorageKey)) || []);
    }

    #saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    findCartItem(productId){
        return this.cartItems.find((cartItem) => cartItem.productId === productId);
    }

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

        this.#saveToStorage();
    }

    removeFromCart (productId){
        const newCart = this.cartItems.filter((cartItem) => {return cartItem.productId !== productId});

        this.cartItems = newCart;

        this.#saveToStorage();
    }

    calculateCartQuantity(){
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    }

    updateProductQuantity(productId, newQuantity){
        const matchingItem = this.findCartItem(productId);

        matchingItem.quantity = newQuantity;

        this.#saveToStorage();
    }

    updateDeliveryOptionId (productId, deliveryOptionId){
        const matchingItem = this.findCartItem(productId);

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.#saveToStorage();
    }
}

const cart = new Cart('cart-oop'); // this is creating an instance of the class


// you can check if an object is an instance of a class by using [obj-name] instanceof [class-name]

/*classes are better than functions cuz it has some extra features for oop, 
  like constructor code */

