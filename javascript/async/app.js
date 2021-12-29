// Example 1 - Promise
const button = document.querySelector('button');
const output = document.querySelector('p');


const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(success => {
        resolve(success);
      }, error => {
          reject(error);
      }, opts);

  }); 
  return promise;
};



// setTimer Promise
const setTimer = duration => {
  const promise = new Promise((resolve, reject) => {

    setTimeout(() => {  // times is set when this promise is created.
       resolve('Timer Done!'); 
    }, duration);

  });
  return promise;
};



async function trackUserHandler() {
    //let positionData;
    let posData;
    let timerData;
    try {
      posData = await getPosition();
      timerData = await setTimer(2000);
     } catch (error) {
        console.log(error);
    }
    console.log(timerData, posData);


  // .then(posData => {
  //   positionData = posData;
  //   return setTimer(2000);
  // })
  // .catch(err => { // catch any errors, any rejections produced anywhere in your promise chain
  //   console.log(err);
  // })
  // .then(data => {
  //     console.log(data, positionData);
  // });

  // setTimer(1000).then(() => {
  //       console.log('Timer done!');
  //   }, 0);

  // console.log('Gettimg position...');
}

button.addEventListener('click', trackUserHandler);
















// Example 2 - Promise
let p = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a === 2) {
    resolve('Success');
  } else {
    reject('Failed');
  }
});

p.then(message => {
  //console.log('This is in the then ' + message);
})
.catch(message => {
  //console.log('This is in the catch ' + message);
})







// Example 3 - Async Prpgramming
setTimeout(() => {
  console.log('Async')
}, 2*1000);

let counter = 0;
let interval = setInterval(() => {
  console.log(++counter)
}, 1000*2); // 1sec = 1000msec

setTimeout(() => {
  clearInterval(interval);
}, 10*1000);







// Example 4 - Callbacks (old async approach)
// console.log('Client - request to server, please send me list of users');
// console.log('...');

// setTimeout(() => {
//   console.log('Server: ask DB for list of users');
//   console.log('...');  

//     setTimeout(() => {
//         console.log('Data base - create list of users');
//         console.log('...');

//         setTimeout(() => {
//           console.log('Server - send response to client');
//           console.log('...');

//           setTimeout(() => {
//             console.log('client - get response from server and show result');
//           }, 1000);
//         }, 500);
//     }, 500);
// }, 1000);







// Example 5 - Promise (new async approach)
console.log('Client - request to server, please send me list of users');
console.log('...');

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let users = [
      { uid: 'id1', name: 'Maxim' },
      { uid: 'id2', name: 'Elena' }
    ];

    console.log('Server: ask DB for list of users', users);
    console.log('...');  
    resolve(users);
  }, 1000);
});


promise.then((dbUsers) => {
  return dbPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Data base - create list of users');
      console.log('...');
      let users = dbUsers.map(user => {
        return {
          id: user.uid,
          firstNamre: user.name,
          timestamp: Date.now()
        }
      });
      resolve(users);
    }, 500);
  });
})
.then((users) => {
  return dbPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Server - send response to client', users);
      console.log('...');
      resolve();
    }, 500);
  });
})
.then(() => {
  setTimeout(() => {
    console.log('client - get response from server and show result');
  }, 1000);
})
.catch(error => {
  console.error(error);
})
.finally(() => {
  console.log('Finally');
});



