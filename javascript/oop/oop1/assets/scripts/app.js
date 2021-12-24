class Product {
    title = 'DEFAULT'; // we set default value to class property
    imageUrl;
    description;
    price;

    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }   

}

console.log(new Product());

const productList = {
    products : [
        new Product( // we create new product object
            'A Pillow',
            'https://via.placeholder.com/150/FF0000/FFFFFF%20C/O%20https://placeholder.com',
             'A soft pillow!',   
             19.99
        ), 
        new Product( // we create new product object
            'A Carpet',
            'https://via.placeholder.com/150/000000/FFFFFF%20C/O%20https://placeholder.com/',
             'A carpet which you might like - or not.',   
             89.99
        )
    ],
    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageUrl}" alt="${prod.title}" />
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
            prodList.append(prodEl);
        }

        renderHook.append(prodList);
    }
};



productList.render();