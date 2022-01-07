class Department {
    private employees: string[] = [];

    /* constructor function */
    constructor(
        private readonly id: string,
        public name: string
        )
        {}

    /* describe method */
    describe(this: Department) {
        console.log(`Department (${this.id}): ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }

    
}






/* ITDepartment class */
class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');    /* we pass data to Department class constructor */
        this.admins = admins;
    }
}





class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');    /* we pass data to Department class constructor */
    }

    addReport(text: string) {
        this.reports.push(text);    
    }

    printReports() {
        console.log(this.reports);
    }
}






const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

it.describe();
it.printEmployeeInformation();

console.log(it);

const accounting = new AccountingDepartment('d2', []);

accounting.addReport('Something went wrong...');
accounting.printReports();












