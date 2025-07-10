import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckOutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage(){// this is a shorthand way to return a promise, returning inside this function is like keeping a value inside the resolve thing, we use this cuz of the await feature, but we can only use await inside an async function
  await loadProductsFetch();

	await new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});

	renderCheckOutHeader();
	renderOrderSummary();
	renderPaymentSummary();
}

loadPage();

/*
  shorthand for this:
  function loadPage(){
    return new Promise((resolve) => {
			[code]
			resolve();
    })
  }

	when using await if we have a resolve that has an argument then we can save it in a value cuz it gets returned

	const value = await new Promise((resolve) => {
		[code]
		resolve('hi');
	});

	then <value> has the value <'hi'> stored in it
*/


//this is too extra
/*
Promise.all([ // this is so that we can do all the promises at once instead of one by one 
	loadProductsFetch(),// it returns a promise directly
	new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	})
]).then(() => {
	renderCheckOutHeader();
	renderOrderSummary();
	renderPaymentSummary();
});
*/



/*
Promise.all([ // this is so that we can do all the promises at once instead of one by one 
    new Promise((resolve) => { 
        loadProducts(() => {
            resolve();
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    renderCheckOutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// new Promise((resolve) => { //callbacks like below cause a lot of nesting, so this is better
//     loadProducts(() => {
//         resolve();
//     });
// }).then(() => {
//     renderCheckOutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });


// loadProducts(() => {
//     renderCheckOutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });
