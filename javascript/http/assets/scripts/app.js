/*
    In this module we will use https://jsonplaceholder.typicode.com
*/

const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

xhr.responseType = 'json';

xhr.onload = function() {
    //const listOfPosts = JSON.parse(xhr.response);
    const listOfPosts = xhr.response;   // if we add "xhr.responseType = 'json';" we can not use "JSON.parse "
    //console.log(listOfPosts);
    for (const post of listOfPosts) {
         const postEl = document.importNode(postTemplate.content, true);    // importNode() method creates a copy of a Node
         postEl.querySelector('h2').textContent = post.title.toUpperCase();
         postEl.querySelector('p').textContent = post.body;
         listElement.append(postEl);
    }
}

xhr.send();







