import { loadProductsFetch } from "../data/products.js";
import { renderOrderPage } from "./orders/orderpageHTML.js";

async function loadOrdersPage(){
	try{
		await loadProductsFetch();
	} catch (error) {
		console.log(error);
		console.log('unexpected error try again');
	}

	renderOrderPage();
}

loadOrdersPage();