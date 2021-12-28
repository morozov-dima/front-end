const button = document.querySelector('button');
const output = document.querySelector('p');

function trackUserHandler() {

  // get user location
  navigator.geolocation.getCurrentPosition(postData => {
    console.log(postData);
    }, error => {
      console.log(error);
    }
  );

  
  console.log('Gettimg position...');
}

button.addEventListener('click', trackUserHandler);



