const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click', () => {
    const userId = 'u123';
    const user = {
        name: 'Max',
        age: 30
    };
    document.cookie = `uid=${userId}; max-age=360`;   // set new cookie fro 3 min = 360 sec (you can also set expires= instead max-age)
    document.cookie = `user=${JSON.stringify(user)}`;   // set new cookie
});

retrBtn.addEventListener('click', () => {
    const cookieData = document.cookie.split(';');
    const data = cookieData.map(i => {
        return i.trim();
    });

     console.log(data[1].split('=')[1]); // user value

    console.log(document.cookie.split('=')); // we get array with splited cookie items
});