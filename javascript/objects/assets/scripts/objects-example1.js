const movieList = document.getElementById('movie-list');

//movieList.style.backgroundColor = 'red';
movieList.style['background-color'] = 'red';
movieList.style.display = 'block';

const userChosenKeyName = 'level';



// ###### Create object ######
const person = {
    'first name': 'Max',
    name: 'Max',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    [userChosenKeyName]: '...',
    greet: function() {
        console.log('Hi there!');
    },
    1.5: 'hello'
};


// ###### add new property to object ######
person.isAdmin = true;


// ###### set new value to object property ######
// person.age = 31; 


// ###### I will assign some age later, probably I just don't have one right now ######
//person.age = null; 


// ###### delete property from  object ######
delete person.age;


// ###### call function in object ######
//person.greet();


// ###### print object key that include ''
// console.log(person['first name']);
// console.log(person[1.5]);



const keyName = 'first name';
console.log(person[keyName]);



console.log(person);

