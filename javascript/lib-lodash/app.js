const customers = ['Max', 'Manuel', 'Anna'];
const activeCustomers = ['Max', 'Manuel'];

// we can find difference between the two arrays.
const inactiveCustomers = _.difference(customers, activeCustomers);


console.log(inactiveCustomers);


