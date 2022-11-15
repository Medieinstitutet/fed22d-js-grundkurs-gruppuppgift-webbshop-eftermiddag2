const donutIncrease = document.querySelectorAll(".donut-amount-increase"); //all + btns
const donutDecrease = document.querySelectorAll(".donut-amount-reduce"); //all - btns
const donutCountCart = document.getElementById("donut-counter-cart"); //text in cart
const sortingButtons = document.querySelectorAll(".sorting-type"); //filter btns

const donutsContainer = document.getElementsByClassName("flex-content"); //array med div:en med ALLA munkar
const mainDonuts = document.getElementById("sort-container"); //creates container for 'insertBefore'
const form = document.getElementById("form-container"); // use for reference position line at <form> in html

let donuts = []; //creates an empty array
const tempDonutContainer = [...donutsContainer]

tempDonutContainer.forEach((donut) => {  //Loops through lenght of 'donutIncrease' which is = amount of donus. Could also use for-loop
    donuts.push({    //push objects to 'donuts'-array.
    // Creates an object with properties 'name, price, count'
    name: donut.childNodes[3].childNodes[1].innerHTML,
    price: donut.childNodes[3].childNodes[5].childNodes[0].innerHTML,
    rating: donut.childNodes[3].childNodes[9].childNodes[1].innerHTML
  })

})
donutCountCart.style.visibility = "visible"; //check with group layout --------------------------


//   ---------------------------------------------------------------------------------------------------------------------
//   ---------------------------------------------CART SUM-------------------------------------------------------

const getDonutCount = () => {
  let sum = 0; // sum starts at 0
  for (let i = 0; i < donutsContainer.length; i++){ //loop
    sum += donutsContainer[i].querySelector(".donut-price").innerHTML * donutsContainer[i].querySelector(".donut-count").innerHTML; // sum = sum+price*st
  }
  return sum;
}


//   ---------------------------------------------------------------------------------------------------------------------
//   --------------------------------------------INCREASE & DECREASE BUTTON--------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------
//

const clickPlus = (e) => { 
  e.currentTarget.parentElement.querySelector('.donut-count').innerHTML++;  // donutAmount[index].innerHTML++; //Adds +1 amount to property 'count' in object
  donutCountCart.innerHTML = getDonutCount(); //Updates cart text
}


const clickMinus = (e) => { 
  if (e.currentTarget.parentElement.querySelector('.donut-count').innerHTML > 0) { 
    e.currentTarget.parentElement.querySelector('.donut-count').innerHTML--;  // donutAmount[index].innerHTML++; //Adds -1 amount to property 'count' in object
    donutCountCart.innerHTML = getDonutCount(); //Updates cart text
  }
}

donutIncrease.forEach((button) => {  //Loops over all increase buttons
  button.addEventListener("click", clickPlus); //On click (on plus button), run function 'clickPlus'
});

donutDecrease.forEach((button) => { //loops over all decrease btns
  button.addEventListener("click", clickMinus);
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
const sortByType = (type,index) => { //creates a function for sorting types (e.g name + price)
  
  let sortedArray = [];   //  empty array for sorted preferences
  let unSortedArray = []; //  empty array for comparison
  donuts.forEach((donut, j) => {    // '.forEach' loops for every donut in 'donutsContainer'
    sortedArray.push(donut[type]); //extracts type from donuts into 'sortedArray'
    unSortedArray.push(   // extracts donuts type from 'index.html' into 'unSortedArray'
      document.getElementsByClassName("donut-" + type)[j].innerHTML //gets the value of the type
    );
  });
  
  const compare = (value) => {  // compares all values from unSortedArray with values in sortedArray until a match, e.g 2===2
  return value === sortedArray[index]; // condition for match for '.findIndex'. '.findIndex' requires a function with conditions.
  }
  
  let foundIndex = unSortedArray.findIndex(compare); //finds index in unSortedArray where elements matches with the sortedArray. It compares with the current index recieved in this function.
  mainDonuts.insertBefore(donutsContainer[foundIndex], form); //insert the found donut above the position reference; <form id="form-contianer"> in 'index.html'
  
  if (index < sortedArray.length - 1) { //index has to be -1 (less) than length because it starts on index 1
    if (type === 'name' ) { // if yes; then re-run function with +1 index. (starts on 2 next time etc)
      sortByType('name',index + 1); 
    }
    if (type === 'price' ) { // if yes; then re-run function with +1 index. (starts on 2 next time etc)
      sortByType('price',index + 1);
    }  
    if (type === 'rating' ) { // if yes; then re-run function with +1 index. (starts on 2 next time etc)
      sortByType('rating',index + 1);
    }   
  }
} 

// sort name 
const sortNameAscFn = (a, b) => { // sort array with objects of ascending proprerty name, from A-Ö. 
  if (a.name < b.name) { // compare first letter in a with first letter in b. Each letter (lower and upper) has different values e.g console.log("a".charCodeAt(0)) returns 97
    return -1; //if return < 0 ---> sort a BEFORE b
  }
  if (a.name > b.name) {
    return 1;  //if return < 0 ---> sort a AFTER b
  }
  return 0; // if its 0 ---> keep order
}

const sortNameAsc = () => {
  donuts.sort(sortNameAscFn); // sorts donuts by sortNameAsc()
  sortByType('name',1); // sort type + start index which is 1 
}

sortNameBtnAsc.addEventListener("click", sortNameAsc)

const sortNameDescFn = (a, b) => { // sort array with objects of proprerty name, from A-Ö. 
  if (a.name > b.name) { 
    return - 1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
}

const sortNameDesc = () => {
  donuts.sort(sortNameDescFn); // sorts donuts after name ascending
  sortByType('name', 1);
}

sortNameBtnDesc.addEventListener("click", sortNameDesc )

const sortPriceAscFn = (a, b) => { //a & b is only made up arguments in this callback function
  return b.price - a.price;   //sorts 'donuts array' by ascending price.
}

//sort price
const sortPriceAsc = () => {
  donuts.sort(sortPriceAscFn)
  sortByType('price', 1); //sorts index.html when compared to 'donuts array'. Starts at 1, wants to compare 2nd index in sortedArray first. ---> bubble sort
}

sortPriceBtnAsc.addEventListener("click", sortPriceAsc); //onlick, run function 'sortPriceAsc'

const sortPriceDescFn = (a, b) => {
  return a.price - b.price; // sorts 'donuts array' by descending price
}

const sortPriceDesc = () => {
  donuts.sort(sortPriceDescFn)
  sortByType('price', 1);
}

sortPriceBtnDesc.addEventListener("click", sortPriceDesc); //onlick, run function 'sortPriceDescsortNameBtnDesc'

//sort ratings
const sortRatingAscFn = (a, b) => { 
  return b.rating - a.rating;  
}

const sortRatingAsc = () => {
  donuts.sort(sortRatingAscFn)
  sortByType('rating', 1); 
}

sortRatingBtnAsc.addEventListener("click", sortRatingAsc)

const sortRatingDescFn = (a, b) => {
  return a.rating - b.rating;
}

const sortRatingDesc = () => {
  donuts.sort(sortRatingDescFn)
  sortByType('rating', 1);
}

sortRatingBtnDesc.addEventListener("click", sortRatingDesc)