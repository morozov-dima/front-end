document.querySelector('#load').addEventListener('click', load);

function load() {
    const url = 'https://jsonplaceholder.typicode.com/users';
   
    // fetch return promise.
    // link to documentation : https://developer.mozilla.org/en-US/docs/Web/API/fetch
    fetch(url)
    .then(response => {
       return response.json();
    })
    .then(data => {
       const ul = document.querySelector('#list');
       const html = data.map(item => {
        return `<li>${item.id} ${item.name} (${item.email})</li>`;
       });
       
      ul.insertAdjacentHTML('afterbegin', html.join(' '));
    });
}




