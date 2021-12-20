// list of variables
let products = [
    {productName: 'For hobby projects or small teams.', productRating: 10 },
    {productName: 'For ambitious projects.', productRating: 20 },
    {productName: 'Your enterprise solution.', productRating: 30 },
    {productName: 'Lorem ipsum dolor sit amet 1', productRating: 4 },
    {productName: 'Lorem ipsum dolor sit amet 2', productRating: 5 },
    {productName: 'Lorem ipsum dolor sit amet 3', productRating: 6 },
    {productName: 'Lorem ipsum dolor sit amet 4', productRating: 7 },
    {productName: 'Lorem ipsum dolor sit amet 5', productRating: 8 },
    {productName: 'Lorem ipsum dolor sit amet 6', productRating: 9 },
    {productName: 'Lorem ipsum dolor sit amet 7', productRating: 3 },
];
 let backdrop = document.querySelector('.backdrop');
 let modal = document.querySelector('.modal');
 let selectPlanButton = document.querySelectorAll('.plan button'); // this give us a list of all the buttons in our plans
 let modalButton = document.querySelector('.modal button');
 let toggleButton = document.querySelector('.toggle-button');





let mobileNav = document.querySelector('.mobile-nav');


//console.dir(backdrop.style.backgroundImage);





setValuesToSteps('.plan-description');



if(selectPlanButton !== null && selectPlanButton !== undefined){
    for (let index = 0; index < selectPlanButton.length; index++) {
        selectPlanButton[index].addEventListener('click',openModal);
    }
}

  if (modalButton !== null && modalButton !== undefined){
    modalButton.addEventListener('click', closeModal);
  }


 if(backdrop){ 
 backdrop.addEventListener('click', function(){
     mobileNav.style.display = 'none';
     closeModal();
 });
}



// set ramdom value to key-feature element
setValueToElement('.key-feature-description-number', getRandomArbitrary(1,100).toFixed(2));

 // add modal link to key-feature elements
addModalLink('.key-feature-image');








// toggle-button
if(toggleButton !== null && toggleButton !== undefined){
    toggleButton.addEventListener('click', function(){
        if(mobileNav !== null && mobileNav !== undefined){
            mobileNav.style.display = 'block';
        }
        if(backdrop !== null && backdrop !== undefined){
            backdrop.style.display = 'block'; 
        }
    });
}







 // set values for steps
 function setValuesToSteps(selectorName){
    let currentObj = getBiggestProductRatings(products, 3);
    let count = 0;
    let planDescription = document.querySelectorAll(selectorName);

    for (const key in planDescription) {
        if (Object.hasOwnProperty.call(planDescription, key)) {
            const element = planDescription[key];
            element.innerHTML = currentObj[count].productName; 
            count++;
        }
    }
 }


// get number of biggest product ratings from object
function getBiggestProductRatings(obj, numberOfResults){
    let biggestValues = [];
    let biggestValuesObj = [];
    let bigValue = 0;
    for (let index = 0; index < numberOfResults; index++) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                //console.log(element);
                if((element.productRating > bigValue) && (!biggestValues.includes(element.productRating))){
                    bigValue = element.productRating;
                }
            }
        } 
        biggestValues.push(bigValue);

        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                //console.log(element.productRating);
                if(element.productRating === bigValue){
                    biggestValuesObj.push({productName: element.productName, productRating: element.productRating});
                }
            }
        }
        bigValue = 0;  
    }
    return biggestValuesObj;
} 
 
 
// add modal link to elements
function addModalLink(value){
    let keyFeature = document.querySelectorAll(value);
    //console.log(keyFeature);
    keyFeature.forEach(element => {
        //console.log(element);
        element.addEventListener('click', openModal);
    });
}


// Set random value to element
function setValueToElement(element, value){
    const htmlElement = document.querySelector(element);
    if(htmlElement !== null && htmlElement !== undefined){
        document.querySelector(element).innerHTML = value;
    }
}


// Getting a random number between two values
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


// close modal popup
function closeModal(){
    if(backdrop !== null && backdrop !== undefined){
        backdrop.style.display = 'none';
    }
    if(modal !== null && modal !== undefined){
        modal.style.display = 'none';     
    }
 }


 // open modal popup
 function openModal(){
    if(modal !== null && modal !== undefined){
        modal.style.display = 'block';
    } 
    if(backdrop !== null && backdrop !== undefined){
        backdrop.style.display = 'block'; 
    }
}









