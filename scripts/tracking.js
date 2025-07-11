import { loadProductsFetch } from "../data/products.js";
import { trackingPageHTML } from "./tracking/trackingPageHTML.js";
import { cart } from "../data/cart-class.js";

async function loadPage() {
    try{
        await loadProductsFetch();
    } catch (error) {
        console.log(error);
        console.log('unexpected error try later');
    }

    document.querySelector('.js-cart-quantity').innerText = cart.calculateCartQuantity();
    trackingPageHTML();
}

loadPage();