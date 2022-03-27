

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