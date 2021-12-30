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
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');


function sendHttpRequest(method, url, data){
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if(xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            }else {
                reject(new Error('something went wrong!!!'));
            }
        }
         
        xhr.onerror = function() {
           reject(new Error('Failed to send request!'));
        }

        xhr.send(JSON.stringify(data));
    });

    return promise;
}


// option 1 (with then)
// get data from server
// function fetchPosts() {
//     sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
//     .then((responseData) => {
//             //const listOfPosts = JSON.parse(xhr.response);
//             const listOfPosts = responseData;   // if we add "xhr.responseType = 'json';" we can not use "JSON.parse "
//             for (const post of listOfPosts) {
//                  const postEl = document.importNode(postTemplate.content, true);    // importNode() method creates a copy of a Node
//                  postEl.querySelector('h2').textContent = post.title.toUpperCase();
//                  postEl.querySelector('p').textContent = post.body;
//                  listElement.append(postEl);
//             }
//     });
// }



// option 2 (with async await)
// get data from server
async function fetchPosts() {
    try {
        const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
            //const listOfPosts = JSON.parse(xhr.response);
            const listOfPosts = responseData;   // if we add "xhr.responseType = 'json';" we can not use "JSON.parse "
            for (const post of listOfPosts) {
                    const postEl = document.importNode(postTemplate.content, true);    // importNode() method creates a copy of a Node
                    postEl.querySelector('h2').textContent = post.title.toUpperCase();
                    postEl.querySelector('p').textContent = post.body;
                    postEl.querySelector('li').id = post.id;                
                    listElement.append(postEl);
            }
    } catch (error) {
        console.error("Our error is : " + error.message);
    }
}



// send data to server
async function createPost(title, content) {
     const userId = Math.random();
     const post = {
       title: title,
       body: content,
       userId: userId 
     };

     sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}



fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;
    createPost(enteredTitle, enteredContent);


});

createPost('DUMMY', 'A dummy post!');



// delete post
postList.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);                
    }
});





























