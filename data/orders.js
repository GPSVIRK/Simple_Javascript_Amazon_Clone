class Orders{
    #localStorageKey;

    orderItems;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;

        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.orderItems = (JSON.parse(localStorage.getItem(this.#localStorageKey)) || []);
    }

    #saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.orderItems));
    }

    addOrder(order){
        this.orderItems.unshift(order);

        this.#saveToStorage();
    }
}

export const orders = new Orders('orders');