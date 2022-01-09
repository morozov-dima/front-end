/* Interfaces as Function Types - begin */
interface AddFn {
    (a: number, b: number): number;
} 

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
};
/* Interfaces as Function Types - end */





interface Named {
    readonly name?: string;     /* optional parameter */
    outputName?: string;    /* optional parameter */
}


interface Greetable extends Named {
    greet(phrase: string) : void;
}


class Person implements Greetable {
    name?: string;  /* optional parameter */
    age = 30;

    constructor(n?: string) {
        if(n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        } else {
            console.log('Hi!');
            
        }
    }
}



let user1: Greetable;

user1 = new Person();


user1.greet('Hi there - I am');
console.log(user1);
