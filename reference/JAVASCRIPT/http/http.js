

// Example 1
//  ********* Sending a GET Request **********
// "GET" data from server.
// This way you can get dynamic content from server and display it into
// your application.
// '200' this is status that we get back from server when we get data from server.
// In this example we use 'XMLHttpRequest'.

const http = new XMLHttpRequest();

// send request to this url.
const url = 'https://jsonplaceholder.typicode.com/posts?_limit=2';

// we can GET request (get data from server).
const method = 'GET';

http.open(method, url);
http.onreadystatechange = function() {
  if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
    // here we transform our data that we get from server into javascript object.
    console.log(JSON.parse(http.responseText));
  } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
    console.log('Error!');
  }
};

// send request
http.send();













// Example 2
// ********** Sending a POST Request ***********
// This way you can send data to server
// '201' this is status that we get back from server when a resource was created
// In this example we use 'XMLHttpRequest'.

const http = new XMLHttpRequest();

// send request to this url.
const url = 'https://jsonplaceholder.typicode.com/posts?_limit=2';

// we can POST request (send data to server).
const method = 'POST';

// data that we send to server
const data = 'title=Post%20Title&body=Body';

http.open(method, url);

// set headers for our request
http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

http.onreadystatechange = function() {

  if(http.readyState === XMLHttpRequest.DONE && http.status === 201) {
    // here we transform our data that we get from server into javascript object.
    console.log(JSON.parse(http.responseText));
  } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 201) {
    console.log('Error!');
  }
};


// send request
http.send(data);


// ********* response from server **********
// this is dummy data that we get from 'jsonplaceholder' when we send 'POST' request.
/*
{
  body: "Body",
  id: 101,
  title: "Post Title"
}
*/













// Example 3 (send httpRequest with fetch)
// 1. this example send data to 'jsonplaceholder'
//    url , https://jsonplaceholder.typicode.com/posts.
// 2. we send data with 'POST'.
// 3. we display data that we get from server in the list.

// ********** html file ************
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Arrays & Iterables</title>
  <link rel="stylesheet" href="style.css" />
  <script src="app.js" defer></script>
</head>

<body>
  <section class="user-data">

    <!-- input userName field begin -->
    <p>
      <label for="userName">User Name:</label>
      <input type="text" name="userName" id="userName" >
    </p>
    <!-- input userName field end -->


    <!-- input email field begin -->
    <p>
      <label for="email">Email</label>
      <input type="email" name="email" id="email">
    </p>
    <!-- input email field end -->


    <!-- submit form button begin -->
    <p class="send-data">
      <button>Send</button>
    </p>
    <!-- submit form button end -->

    <p class="result">

    </p>

  </section>
</body>
</html>







// ********** js file ************
const userButton = document.querySelector('.send-data button');
const userNameInput = document.getElementById('userName');
const emailInput = document.getElementById('email');

let responseId = null;


userButton.addEventListener('click', onSubmitForm);


function onSubmitForm() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url, {
        method: 'POST',
        // body: JSON.stringify({
        //     userName: 'userNameInput',
        //     email: 'email'
        // }),
        body: JSON.stringify([
            { userName: 'userNameInput', email: 'email' },
            { userName: 'userNameInput2', email: 'email2' },
            { userName: 'userNameInput3', email: 'email3' },
            { userName: 'userNameInput4', email: 'email4' }
        ]),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
      })
        .then(
            (response) => response.json()
        )
        .then(
            (responseJson) => {
                displayFormResult(responseJson)
            }
        );
    }



    function displayFormResult(responseJson) {
        let resultListElement = document.createElement('ul');
        let resultElement = document.querySelector('.result');
        for (const key in responseJson) {
            if (key === 'id') { continue; }  // skip id
            if (Object.hasOwnProperty.call(responseJson, key)) {
                const element = responseJson[key];
                resultListElement.innerHTML += `
                    <li>Username: ${element.userName}, email: ${element.email}</li>
                `;
            }
        }
        resultElement.append(resultListElement);
    }







