import { loadProductsFetch } from "../data/products.js";
import { trackingPageHTML } from "./tracking/trackingPageHTML.js";

async function loadPage() {
    try{
        await loadProductsFetch();
    } catch (error) {
        console.log(error);
        console.log('unexpected error try later');
    }

    trackingPageHTML();
}

loadPage();