

const userButton = document.querySelector('.send-data button');
const userNameInput = document.getElementById('userName');
const emailInput = document.getElementById('email');

let resultElement = document.querySelector('.result');
let responseId = null;


userButton.addEventListener('click', submitForm);


function submitForm() {
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
            (json) => {
                console.log(json)
                console.log(json.id);
                responseId = json.id
                resultElement.innerHTML = json.id;
            }
        );
}