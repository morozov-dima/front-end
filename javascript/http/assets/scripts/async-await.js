document.querySelector('#load').addEventListener('click', load);

async function load() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(url);
    const data = await response.json();

    const ul = document.querySelector('#list');
    const html = data.map(item => {
    return `<li>${item.id} ${item.name} (${item.email})</li>`;
    });
    
    ul.insertAdjacentHTML('afterbegin', html.join(' '));

}