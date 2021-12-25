class Product {
    // title = 'DEFAULT'; // we set default value to class property
    // imageUrl;
    // description;
    // price;

    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }   
}





class ShoppingCart {
   items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `
            <h2>Total: \$${this.totalAmount.toFixed(2)}</h2>
        `;
    }

   get totalAmount() {
       const sum = this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0); // sum of array items
       return sum;
   }

   // add product method
   addProduct(product) {
        const updatedItems = [...this.items]; // we create updatedItems as copy of items (with spread operator)
        updatedItems.push(product);
        this.cartItems = updatedItems;
   }
   
   // render method
   render() {
       const cartEl = document.createElement('section');
       cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
       `;
        cartEl.className = 'cart';
        this.totalOutput = cartEl.querySelector('h2');
        return cartEl;
   }
}






class ProductItem {
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        App.addPtoductToCart(this.product);
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}" />
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
        return prodEl;
    }
}







class ProductList {
    products = [
            new Product( 
                'A Pillow',
                'https://via.placeholder.com/150/FF0000/FFFFFF%20C/O%20https://placeholder.com',
                 'A soft pillow!',   
                 19.99
            ), 
            new Product( 
                'A Carpet',
                'https://via.placeholder.com/150/000000/FFFFFF%20C/O%20https://placeholder.com/',
                 'A carpet which you might like - or not.',   
                 89.99
            )
    ];


    constructor() {}

    // render method in our class
    render() {

        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {

            // ProductItem Class
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }

        return prodList;
    }

}




class Shop {
 
    render() {
        const renderHook = document.getElementById('app');

        this.cart = new ShoppingCart(); // now "cart" is a property of shop
        const cartEl = this.cart.render();
        const productList = new ProductList();
        const prodListEl = productList.render();
        
        renderHook.append(cartEl);
        renderHook.append(prodListEl); 
    }
}



// class with static properties and static methods
class App {
  static cart;  

  static  init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }  

  static addPtoductToCart(product) {
         this.cart.addProduct(product);
  }

}


App.init(); // run static method
