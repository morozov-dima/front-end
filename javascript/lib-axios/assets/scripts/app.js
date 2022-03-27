       
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');


// get data from server
// link to documentation : https://axios-http.com/docs/req_config
async function fetchPosts() {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts', {
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                params: {
                    a: 11111.22222
                }
              }
            );
        console.log(response);
            const listOfPosts = response.data; 
            for (const post of listOfPosts) {
                    const postEl = document.importNode(postTemplate.content, true);    // importNode() method creates a copy of a Node
                    postEl.querySelector('h2').textContent = post.title.toUpperCase();
                    postEl.querySelector('p').textContent = post.body;
                    postEl.querySelector('li').id = post.id;                
                    listElement.append(postEl);
            }
    } catch (error) {
        console.error("Our error is : " + error.message);
        console.log(error.response);
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

     const fd = new FormData(form);
    //  fd.append('title', title);
    //  fd.append('body', content);
     fd.append('userId', userId);

    // const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
    const response = await axios.post(
            'https://jsonplaceholder.typicode.com/posts',
            fd,
            {
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                params: {
                    a: 11111.22222
                }
            }
         );
    //console.log(response);
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
        axios.delete(
            `https://jsonplaceholder.typicode.com/posts/${postId}`,
            {
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                params: {
                    a: 11111.22222
                }
            }
        );                
    }
});





























