import { loadProductsFetch } from "../data/products.js";
import { renderCheckoutPageIFCART } from "./checkout/emptyCart.js";

async function loadPage(){// this is a shorthand way to return a promise, returning inside this function is like keeping a value inside the resolve thing, we use this cuz of the await feature, but we can only use await inside an async function
	try {
		await loadProductsFetch();
	} catch(error) {
		console.log('unexpected error: please try again');
	}
  	
	renderCheckoutPageIFCART();
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

	try catch can be used with normal code as well, try catch is used for unexpected error
	throw is a key word that allows us to cause an error intentionally
	throw [value]; returns the value as the catch error
	inside a promise we can use throw
	but you cant do that inside any of the asyncronous code, like loadProducts basically it cant run in the future, the reject function
	allows us to create a function in the future
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
