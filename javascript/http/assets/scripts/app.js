/*
    In this module we will use https://jsonplaceholder.typicode.com
*/




/* 
    Example 1
*/
// const listElement = document.querySelector('.posts');
// const postTemplate = document.getElementById('single-post');
// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
// xhr.responseType = 'json';
// xhr.onload = function() {
//     //const listOfPosts = JSON.parse(xhr.response);
//     const listOfPosts = xhr.response;   // if we add "xhr.responseType = 'json';" we can not use "JSON.parse "
//     //console.log(listOfPosts);
//     for (const post of listOfPosts) {
//          const postEl = document.importNode(postTemplate.content, true);    // importNode() method creates a copy of a Node 
//          postEl.querySelector('h2').textContent = post.title.toUpperCase();
//          postEl.querySelector('p').textContent = post.body;
//          listElement.append(postEl);
//     }
// }
// xhr.send();











/* 
    Example 2 (with promises)
*/
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

function sendHttpRequest(method, url){
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = function() {
            resolve(xhr.response);
        }
        xhr.send();
    });

    return promise;
}


// option 1 (with then)
function fetchPosts() {
    sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
    .then((responseData) => {
            //const listOfPosts = JSON.parse(xhr.response);
            const listOfPosts = responseData;   // if we add "xhr.responseType = 'json';" we can not use "JSON.parse "
            for (const post of listOfPosts) {
                 const postEl = document.importNode(postTemplate.content, true);    // importNode() method creates a copy of a Node
                 postEl.querySelector('h2').textContent = post.title.toUpperCase();
                 postEl.querySelector('p').textContent = post.body;
                 listElement.append(postEl);
            }
    });
}



// option 2 (with async await)
// async function fetchPosts() {
//     const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
//         //const listOfPosts = JSON.parse(xhr.response);
//         const listOfPosts = responseData;   // if we add "xhr.responseType = 'json';" we can not use "JSON.parse "
//         for (const post of listOfPosts) {
//                 const postEl = document.importNode(postTemplate.content, true);    // importNode() method creates a copy of a Node
//                 postEl.querySelector('h2').textContent = post.title.toUpperCase();
//                 postEl.querySelector('p').textContent = post.body;
//                 listElement.append(postEl);
//         }
// }




fetchPosts();






























