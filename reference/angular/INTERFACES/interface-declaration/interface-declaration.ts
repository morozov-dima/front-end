// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************


// We can use interfaces to define object types.
interface Human {
    firstName: string;
    age: number;

    // 1. we just add type of our method
    // 2. and now our 'Human' interface should have 'greet' method, that
    //    takes no parameters and returns nothing.
    greet: () => void;
}



let max: Human;



// and now this object fulfills the requirements se forth by that interface.
max = {
    firstName: 'Max',
    age: 32,
    // and here we have actual code, not the type defenition.
    greet() {
        console.log('Hello!');
        
    }
};



// 1. where when we define class that implements our interface
//    we must add 'greet' method and 'firstName' and 'age' properies.
//    and only after this our class will be correctly implemented by our interface.
class Instructor implements Human {
    firstName: string;
    age: number;
    greet() {
        console.log('Hello !!!');
    }
}