

// **************************************************************************
// ******************************** Example *********************************
// **************************************************************************


// **************************** users.interface.ts **************************
export interface UserState {
    users: User[];
    error: string;
}



export interface Posts {
    userId: number;
    id: number;
    title: string;
    body: string;
}


export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
    network: string;
}





export interface Apartment {
    id?: number;  // optional
    name: string;
    reviewScore: number;
    starRating: number;
    price: number;
    freeCancellation: boolean;
    distanceFromClosestBeach : number;
}











// **************************************************************************
// ******************************** Example *********************************
// **************************************************************************

/* Interfaces as Function Types - begin */
interface AddFn {
    (a: number, b: number): number;
} 










// **************************************************************************
// ******************************** Example *********************************
// **************************************************************************
interface Named {
    readonly name?: string;    
    outputName?: string;   
}


interface Greetable extends Named {
    greet(phrase: string) : void;
}








// **************************************************************************
// ******************************** Example *********************************
// **************************************************************************
interface Animal {
    name: string;
    age: number;
  }
  interface Dog extends Animal {
    run(): void;
  }
  
  const a1: Dog = {
    name: 'Tom',
    age: 3,
    run() {
      console.log('the dog runs...');
    },
  };