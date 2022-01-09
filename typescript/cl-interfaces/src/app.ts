abstract class Department {
    static fiscalYear = 2020;   /* static property */
    protected employees: string[] = [];

    /* constructor function */
    constructor(
        protected readonly id: string,
        public name: string
        )
        {}

        static createEmployee(name: string) {   /* static method */
            return {name: name}
        }    


    /* describe method */
    abstract describe(this: Department): void;

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

    describe() {
        console.log('It Department - ID: ' + this.id);
    }
}









class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return  this.lastReport;
        }
        throw new Error("No report found.");
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error("Please pass in a valid valie!");
        }
        this.addReport(value);
    }


    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');    /* we pass data to Department class constructor */
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }


    describe() {
        console.log('Accounting Department - ID: ' + this.id);
        
    }

    addEmployee(name: string) {
        if (name === 'Max') {
           return;     
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;    
    }

    printReports() {
        console.log(this.reports);
    }
}








const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);


const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

it.describe();
it.printEmployeeInformation();

console.log(it);

//const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);


accounting.mostRecentReport = 'Year End Report';

accounting.addReport('Something went wrong...');

console.log(accounting.mostRecentReport);




accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.printReports();
// accounting.printEmployeeInformation();

accounting.describe();












