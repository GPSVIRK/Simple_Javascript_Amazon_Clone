const xhr = new XMLHttpRequest();

xhr.addEventListener('load',() => { //load is when the response loads, this solves the asynchronous code thing, we have to write this first
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');//first is the type of message we are sending, the second is the URL to which we are sending the info to
xhr.send();//now it will send it to the backend computer there
// xhr.response(); xhr.send is asynchronous code, causing response to be undefined at first, until it recieves the response and allows us to use it

/*some of them provide a documentation page, all the file paths supported together are called the backend API (application programming interface)
  basicallly it allows us to interact with the website like this*/

