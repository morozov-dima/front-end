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

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}





class Component {
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }

    render() {

    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}





class ShoppingCart extends Component {
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

   constructor(renderHookId) {
       super(renderHookId); // calls the parent constructor.
   }

   // add product method
   addProduct(product) {
        const updatedItems = [...this.items]; // we create updatedItems as copy of items (with spread operator)
        updatedItems.push(product);
        this.cartItems = updatedItems;
   }
   
   // render method
   render() {
       const cartEl = this.createRootElement('section', 'cart'); //method from Component class
       cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
       `;
        this.totalOutput = cartEl.querySelector('h2');
   }
}








class ProductItem extends Component  {
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    addToCart() {
        App.addPtoductToCart(this.product);
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item');
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
     }
}






class ProductList extends Component {
    products = [];


    constructor(renderHookId) {
        super(renderHookId);
        this.fetchProducts();
    }

    fetchProducts() {
        this.products = [
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
        this.renderProducts();
    }


   renderProducts() {
        for (const prod of this.products) {
            new ProductItem(prod, 'prod-list');
        }
   } 



    // render method in our class
    render() {
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
        if (this.products && this.products.length > 0) {
            this.renderProducts();
        }
    }
}





class Shop {
    constructor() {
        this.render();
    }

    render() {
        this.cart = new ShoppingCart('app'); // now "cart" is a property of shop
        new ProductList('app');
    }
}






// class with static properties and static methods
class App {
  static cart;  

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }  

  static addPtoductToCart(product) {
         this.cart.addProduct(product);
  }

}


App.init(); // run static method
