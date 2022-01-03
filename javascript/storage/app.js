const storeBtn = document.getElementById('store-btn');
const retrBtn = document.getElementById('retrieve-btn');

let db;

const dbRequest = indexedDB.open('StorageDummy', 1); // create new database or open a connection is our database already exist


dbRequest.onsuccess = function(event) {
    db = event.target.result;
}


dbRequest.onupgradeneeded = function(event) {
    db = event.target.result;

    const objStore = db.createObjectStore('products', {keyPath: 'id'});

    objStore.transaction.oncomplete = function(event) {
      const productsStore = db.transaction('products', 'readwrite').objectStore('products');
      productsStore.add({
          id: 'p1',
          title: 'A First Product',
          proce: 12.99,
          tags: ['Expensive', 'Luxury']
        });
    }

}

dbRequest.error = function(event) {
 console.log('Error');   
}


storeBtn.addEventListener('click', () => {
    if (!db) {
        return;
    }
    const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
    productsStore.add({
        id: 'p2',
        title: 'A First Product',
        proce: 122.99,
        tags: ['Expensive', 'Luxury']
      });
});

retrBtn.addEventListener('click', () => {

});