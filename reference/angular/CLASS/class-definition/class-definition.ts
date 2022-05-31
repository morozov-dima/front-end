// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************

// Long way of defining certain properties of this class.


class Student {
    firstName: string;
    lastName: string;
    age: number;
    private courses: string[];

    // we can also add a constructor method, 
    constructor(first: string, last: string, age: number, courses: string[]) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.courses = courses;
    }

    enrol(courseName: string) {
        this.courses.push(courseName);
    }

    listCourses() {
        // because we want create object deep clone.
        return this.courses.slice();
    }
}

// 1. here we pass values to our constructor.
// 2. You could also set properties in a different way, for example, by assigning default values
//    or after you created an object with 'dot' notation. 
// 3. We can assign values to those class properties when that class is instantiated.
const student = new Student('Max', 'Schwarz', 32, ['Angular']);
student.enrol('React');

// student.listCourses(); => Angular, React

// student.courses => Angular, React
















// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************

// Short way of defining certain properties of this class.

class Student2 {
    // we can also add a constructor method, 
    constructor(
        public firstName: string,
        public lastName: string,
        public age: number,
        private courses: string[]
        ) {}

    enrol(courseName: string) {
        this.courses.push(courseName);
    }

    listCourses() {
        // because we want create object deep clone.
        return this.courses.slice();
    }
}

// 1. here we pass values to our constructor.
// 2. You could also set properties in a different way, for example, by assigning default values
//    or after you created an object with 'dot' notation. 
// 3. We can assign values to those class properties when that class is instantiated.
const student2 = new Student('Max', 'Schwarz', 32, ['Angular']);
student.enrol('React');

// student.listCourses(); => Angular, React

// student.courses => Angular, React

