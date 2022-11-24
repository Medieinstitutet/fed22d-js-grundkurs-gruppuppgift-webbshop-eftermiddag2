/*eslint-disable arrow-body-style */
/* eslint-disable spaced-comment */
const donutIncrease = document.querySelectorAll('.donut-amount-increase'); //all + btns
const donutDecrease = document.querySelectorAll('.donut-amount-reduce'); //all - btns
const donutCountCart = document.getElementById('donut-counter-cart'); //text in cart
const sortingButtons = document.querySelectorAll('.sorting-type'); //filter btns

const donutsContainer = document.getElementsByClassName('flex-content'); //array med div:en med ALLA munkar
const mainDonuts = document.getElementById('sort-container'); //creates container for 'insertBefore'
const form = document.getElementById('form-container'); // use for reference position line at <form> in html

const donuts = []; //creates an empty array
const tempDonutContainer = [...donutsContainer];

tempDonutContainer.forEach((donut) => {
  //Loops through lenght of 'donutIncrease' which is = amount of donus. Could also use for-loop
  donuts.push({
    //push objects to 'donuts'-array.
    // Creates an object with properties 'name, price, count'
    name: donut.childNodes[3].childNodes[1].innerHTML,
    price: donut.childNodes[3].childNodes[5].childNodes[0].innerHTML,
    rating: donut.childNodes[3].childNodes[9].childNodes[1].innerHTML,
  });
});
donutCountCart.style.visibility = 'visible'; //check with group layout --------------------------

//   ---------------------------------------------------------------------------------------------------------------------
//   ---------------------------------------------CART SUM-------------------------------------------------------

const getDonutCount = () => {
  let sum = 0; // sum starts at 0
  for (let i = 0; i < donutsContainer.length; i++) {
    //loop
    sum +=
      donutsContainer[i].querySelector('.donut-price').innerHTML *
      donutsContainer[i].querySelector('.donut-count').innerHTML; // sum = sum+price*st
  }
  return sum;
};

//   ---------------------------------------------------------------------------------------------------------------------
//   --------------------------------------------INCREASE & DECREASE BUTTON--------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------
//

const clickPlus = (e) => {
  e.currentTarget.parentElement.querySelector('.donut-count').innerHTML++; // donutAmount[index].innerHTML++; //Adds +1 amount to property 'count' in object
  donutCountCart.innerHTML = getDonutCount(); //Updates cart text
};

const clickMinus = (e) => {
  if (
    e.currentTarget.parentElement.querySelector('.donut-count').innerHTML > 0
  ) {
    e.currentTarget.parentElement.querySelector('.donut-count').innerHTML--; // donutAmount[index].innerHTML++; //Adds -1 amount to property 'count' in object
    donutCountCart.innerHTML = getDonutCount(); //Updates cart text
  }
};

donutIncrease.forEach((button) => {
  //Loops over all increase buttons
  button.addEventListener('click', clickPlus); //On click (on plus button), run function 'clickPlus'
});

donutDecrease.forEach((button) => {
  //loops over all decrease btns
  button.addEventListener('click', clickMinus);
});

// ------------------------------------------------------------------------------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------
//   -------------------------------------SORTING FUNCTION-----------------------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------

const sortPriceBtnAsc = sortingButtons[0]; //Button Sort price: High to low.
const sortPriceBtnDesc = sortingButtons[1]; // Button sort price: Low to high.
const sortNameBtnAsc = sortingButtons[2]; // Btn sort name A-Ö
const sortNameBtnDesc = sortingButtons[3]; // Btn sort name Ö-A
const sortRatingBtnAsc = sortingButtons[4]; // Btn sort Rating high to low
const sortRatingBtnDesc = sortingButtons[5]; // btn sort rating low to high

//For sortByType to work, index MUST start at 1 ---> Bubble sort
const sortByType = (type, index) => {
  //creates a function for sorting types (e.g name + price)

  const sortedArray = []; //  empty array for sorted preferences
  const unSortedArray = []; //  empty array for comparison
  donuts.forEach((donut, j) => {
    // '.forEach' loops for every donut in 'donutsContainer'
    sortedArray.push(donut[type]); //extracts type from donuts into 'sortedArray'
    unSortedArray.push(
      // extracts donuts type from 'index.html' into 'unSortedArray'
      document.getElementsByClassName(`donut-${type}`)[j].innerHTML //gets the value of the type
    );
  });

  const compare = (value) => {
    // compares all values from unSortedArray with values in sortedArray until a match, e.g 2===2
    return value === sortedArray[index]; // condition for match for '.findIndex'. '.findIndex' requires a function with conditions.
  };

  const foundIndex = unSortedArray.findIndex(compare); //finds index in unSortedArray where elements matches with the sortedArray. It compares with the current index recieved in this function.
  mainDonuts.insertBefore(donutsContainer[foundIndex], form); //insert the found donut above the position reference; <form id="form-contianer"> in 'index.html'

  if (index < sortedArray.length - 1) {
    //index has to be -1 (less) than length because it starts on index 1
    if (type === 'name') {
      // if yes; then re-run function with +1 index. (starts on 2 next time etc)
      sortByType('name', index + 1);
    }
    if (type === 'price') {
      // if yes; then re-run function with +1 index. (starts on 2 next time etc)
      sortByType('price', index + 1);
    }
    if (type === 'rating') {
      // if yes; then re-run function with +1 index. (starts on 2 next time etc)
      sortByType('rating', index + 1);
    }
  }
};

// sort name
const sortNameAscFn = (a, b) => {
  // sort array with objects of ascending proprerty name, from A-Ö.
  if (a.name < b.name) {
    // compare first letter in a with first letter in b. Each letter (lower and upper) has different values e.g console.log("a".charCodeAt(0)) returns 97
    return -1; //if return < 0 ---> sort a BEFORE b
  }
  if (a.name > b.name) {
    return 1; //if return < 0 ---> sort a AFTER b
  }
  return 0; // if its 0 ---> keep order
};

const sortNameAsc = () => {
  donuts.sort(sortNameAscFn); // sorts donuts by sortNameAsc()
  sortByType('name', 1); // sort type + start index which is 1
};

sortNameBtnAsc.addEventListener('click', sortNameAsc);

const sortNameDescFn = (a, b) => {
  // sort array with objects of proprerty name, from Ö-A.
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
};

const sortNameDesc = () => {
  donuts.sort(sortNameDescFn);
  sortByType('name', 1);
};

sortNameBtnDesc.addEventListener('click', sortNameDesc);

const sortPriceAscFn = (a, b) => {
  //a & b is only made up arguments in this callback function
  return b.price - a.price; //sorts 'donuts array' by ascending price.
};

//sort price
const sortPriceAsc = () => {
  donuts.sort(sortPriceAscFn);
  sortByType('price', 1);
};

sortPriceBtnAsc.addEventListener('click', sortPriceAsc);

const sortPriceDescFn = (a, b) => {
  return a.price - b.price; // sorts 'donuts array' by descending price
};

const sortPriceDesc = () => {
  donuts.sort(sortPriceDescFn);
  sortByType('price', 1);
};

sortPriceBtnDesc.addEventListener('click', sortPriceDesc);

//sort ratings
const sortRatingAscFn = (a, b) => {
  return b.rating - a.rating; // sorts 'donuts array' by rating
};

const sortRatingAsc = () => {
  donuts.sort(sortRatingAscFn);
  sortByType('rating', 1);
};

sortRatingBtnAsc.addEventListener('click', sortRatingAsc);

const sortRatingDescFn = (a, b) => {
  return a.rating - b.rating;
};

const sortRatingDesc = () => {
  donuts.sort(sortRatingDescFn);
  sortByType('rating', 1);
};

sortRatingBtnDesc.addEventListener('click', sortRatingDesc);

//filter btns
const filterBtns = document.querySelectorAll('.filter-type');
const filterBtnGlaze = filterBtns[0];
const filterBtnSprinkle = filterBtns[1];
const filterBtnNone = filterBtns[2];
const filterBtnAll = filterBtns[3];

const noneArray = document.getElementsByClassName('category-none');
const sprinkleArray = document.getElementsByClassName('category-sprinkle');
const glazeArray = document.getElementsByClassName('category-glaze');

const showNone = () => {
  for (let i = 0; i < noneArray.length; i++) {
    noneArray[i].style.display = 'flex';
  }
};
const showGlaze = () => {
  for (let i = 0; i < glazeArray.length; i++) {
    glazeArray[i].style.display = 'flex';
  }
};
const showSprinkle = () => {
  for (let i = 0; i < sprinkleArray.length; i++) {
    sprinkleArray[i].style.display = 'flex';
  }
};
const hideAll = () => {
  for (let i = 0; i < noneArray.length; i++) {
    noneArray[i].style.display = 'none';
  }
  for (let i = 0; i < glazeArray.length; i++) {
    glazeArray[i].style.display = 'none';
  }
  for (let i = 0; i < sprinkleArray.length; i++) {
    sprinkleArray[i].style.display = 'none';
  }
};

const filterGlaze = () => {
  hideAll();
  showGlaze();
};
const filterSprinkle = () => {
  hideAll();
  showSprinkle();
};
const filterNone = () => {
  hideAll();
  showNone();
};
const filterAll = () => {
  showNone();
  showGlaze();
  showSprinkle();
};

filterBtnGlaze.addEventListener('click', filterGlaze);
filterBtnSprinkle.addEventListener('click', filterSprinkle);
filterBtnNone.addEventListener('click', filterNone);
filterBtnAll.addEventListener('click', filterAll);

//-------------------------------------------------------------------------------------
//----------------------------------SHOPPING CART--------------------------------------
//-------------------------------------------------------------------------------------

/**
 * []Summeringen av beställningen ska visas i varukorgen
 */

const openBtn = document.querySelectorAll('#openCart');
const closeBtn = document.querySelectorAll('#closeCart');

const cart = document.querySelectorAll('#shoppingCart'); 
 
 openBtn[0].addEventListener('click', () =>{ 
  cart[0].classList.toggle("hidden");
 }) // If you click on "Varukorg" the shopping cart will open
   


closeBtn[0].addEventListener('click', () => {
  cart[0].classList.toggle('hidden');
}); // If you click on the button "Stäng" while the shopping cart is open it will close the shopping cart

const orderBtn = document.querySelectorAll('#order');
const showForm = document.querySelectorAll('#formContainer');


orderBtn[0].addEventListener('click', () =>{ 
  showForm[0].classList.toggle("hidden");
  cart[0].classList.toggle("hidden");

}) // The form will only be visible if you click on "Beställ" 


//-------------------------------------------------------------------------------------
//---------------------------------------FORM------------------------------------------
//-------------------------------------------------------------------------------------

/**
 * Kontrollera att alla fält är korrekt ifyllda
 * 
 * Betalsätt..
 * 
 * Rabattkod..
 * 
 * Visa summan av beställningen
 * 
 * Gör så att knappen "Rensa beställning" rensar beställningen
 */

//Variables for the input fields
/*const firstNameField = document.querySelector('#name');
const lastNameField = document.querySelector('#lastName'); */
const addressField = document.querySelector('#address');
const postNumberField = document.querySelector('#postNumber');
//const localityField = document.querySelector('#locality');
//const doorCodeField = document.querySelector('#doorCode'); not a compulsory field?
/*const phoneNumberField = document.querySelector('#phoneNumber');
const eMailField = document.querySelector('#eMail');
const cardNumberField = document.querySelector('#cardNumber');
const dateField = document.querySelector('#date'); 
const cvcField = document.querySelector('#cvc');
const discountField = document.querySelector('#discount'); */

//Variables for form and error
const formContainer = document.querySelector('#formContainer');
const errorText = document.querySelector('#error');

//Variables for the buttons
/*const sendBtn = document.querySelector('#sendBtn');
const clearBtn = document.querySelector('#clearBtn'); */

//Keep track if fields have correct values
/*let validName = false;
let validLastName = false; */
let validAddress = false;
/*let validPostNumber = false;
let validLocality = false;
let validPhoneNumber = false;
let validEMail = false;
let validCardNumber = false;
let validDate = false;
let validCvc = false;
let validDiscount = false; */

formContainer.addEventListener('submit', (e) => {
  const errorMessages = []

  if (postNumberField.value.length !== 5) {  //Checks that the postnumber is valid
    errorMessages.push('Felaktigt postnummer') //FIX! The error message should disappear when you write the postnumber correctly
  }

  if (errorMessages.length > 0) { //If the length of error messages are greater than 0 the form will not submit
     e.preventDefault()
     errorText.innerText = errorMessages.join(', ') //Shows error messages and separates them if there are multiple errors
  }
 
})


// Trying two methods, this is the second
function checkAddress() {
  if(addressField.value.indexOf(' ') > -1) {
    validAddress = true;
  } else {
    validAddress = false;
  }
}
console.log(validAddress);

//Check values on input field
//firstNameField.addEventListener('change', checkName);
//lastNameField.addEventListener('change', checkLastName);
addressField.addEventListener('change', checkAddress);
/*postNumberField.addEventListener('change', checkPostNumber);
localityField.addEventListener('change', checkLocality);
doorCodeField.addEventListener('change', checkDoorCode); not needed?
phoneNumberField.addEventListener('change', checkPhoneNumber);
eMailField.addEventListener('change', checkEMail);
cardNumberField.addEventListener('change', checkCardNumber);
dateField.addEventListener('change', checkDate);
cvcField.addEventListener('change', checkCvc);
discountField.addEventListener('change', checkDiscount); */


