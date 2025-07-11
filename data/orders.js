class Orders{
	#localStorageKey;

	orderData;

	constructor(localStorageKey){
		this.#localStorageKey = localStorageKey;

		this.#loadFromStorage();
	}

	#loadFromStorage(){
		this.orderData = (JSON.parse(localStorage.getItem(this.#localStorageKey)) || []);
	}

	#saveToStorage(){
		localStorage.setItem(this.#localStorageKey, JSON.stringify(this.orderData));
	}

	addOrder(order){
		this.orderData.unshift(order);

		this.#saveToStorage();
	}
}

export const orders = new Orders('orders');