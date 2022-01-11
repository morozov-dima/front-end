/* option 1 - with type */

type Admin = {
    name: string;
    privileges: string[];
};


type Employee = {
    name: string;
    startDate: Date;
};


type ElevatedEmployee = Admin & Employee;


const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};








type Combinable = string | number;
type Numeric = number | boolean;


type Universal = Combinable & Numeric;

/* Function Overloads */
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Max', 'Schwawrz');






/* Optional Chaining */
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: {
        title: 'CEO',
        description: 'My own company'
    }
};

console.log(fetchedUserData?.job?.title);







/* Nullish Coalescing */
const userInput = null;

const storedData = userInput ?? 'DEFAULT';

console.log(storedData);






















// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//     console.log('Name: ' + emp.name);
//     if ('privileges' in emp) {
//         console.log('Privileges: ' + emp.privileges);
//     }
//     if ('startDate' in emp) {
//         console.log('Strart Date: ' + emp.startDate);
//     }
// }

// printEmployeeInformation({name: 'Manu', startDate: new Date()});









// class Car {
//     drive() {
//         console.log('Driving...');
//     }
// }

// class Truck {
//     drive() {
//         console.log('Driving a truck...');
//     }

//     loadCargo(amount: number) {
//         console.log('Loading cargo ...' + amount);
        
//     }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//     vehicle.drive();
//     if (vehicle instanceof Truck) {
//         vehicle.loadCargo(1000);
//     }
// }

// useVehicle(v1);
// useVehicle(v2);


// /* option 2 - with interface */
// // interface Admin {
// //     name: string;
// //     privileges: string[];
// // };


// // interface Employee {
// //     name: string;
// //     startDate: Date;
// // };


// // interface ElevatedEmployee extends Employee, Admin {

// // }

// // const e1: ElevatedEmployee = {
// //     name: 'Max',
// //     privileges: ['create-server'],
// //     startDate: new Date()
// // };









// /* Discriminated Unions */
// interface Bird {
//     type: 'bird';
//     flyingSpeed: number;
// }

// interface House {
//     type: 'horse';
//     runningSpeed: number;
// }

// type Animal = Bird | House;

// function moveAnimal(animal :Animal) {
//     let speed;
//     switch (animal.type) {
//         case 'bird':
//             speed = animal.flyingSpeed;
//             break;
//         case 'horse':
//             speed = animal.runningSpeed;
//             break;
//     }
//     console.log('Moving at speed: ' + speed);
// }


// moveAnimal({type: 'bird', flyingSpeed: 10});










// /* Type Casting */
// // const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;   /* vertion 1 */
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;   /* vertion 2 */
// userInputElement.value = 'Hi there!';







// /* Index Properties */
// interface ErrorContainer {  // { email: 'Not a valid email', username: 'Must start with a character!' }
//     [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//     email: 'Not a valid email!',
//     username: 'Must start with a capital character!'
// };
















