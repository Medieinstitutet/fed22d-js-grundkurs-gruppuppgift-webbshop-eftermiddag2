const donutAmount = document.querySelectorAll(".donut-count");
const donutIncrease = document.querySelectorAll(".donut-amount-increase");
const donutDecrease = document.querySelectorAll(".donut-amount-reduce");
const donutCountCart = document.getElementById("donut-counter-cart");
const sortingButtons = document.querySelectorAll(".sorting-type");

var donutCount = [];
let donuts = [];
//Puts all amounts of donuts to 0, and makes sure we have variables for every donut
donutAmount.forEach((_, index) => {
  //Loops through every class with ".donut-count"
  donuts.push({
    //push objects to 'donuts'-array. Object with properties 'name, price, count'
    name: document.getElementsByClassName("donut-name")[index].innerHTML,
    price: document.getElementsByClassName("donut-price")[index].innerHTML,
    count: 0,
  })
})

//       donutCountCart.style.visibility = "visible"

// Callback function used in '.reduce'
const cartSum = (acc, donut) => {
  return acc + donut.price * donut.count
}

//Gets the total amount of donuts (cartSum)
const getDonutCount = () => {
  return donuts.reduce(cartSum, 0);
}

donutIncrease.forEach((button, index) => {  //Loops over all increase buttons
const clickPlus = () => {
  //Adds eventlistener to each button
  donuts[index].count++; //Adds +1 amount
  donutAmount[index].innerHTML = donuts[index].count; //Updates count text
  donutCountCart.innerHTML = getDonutCount(); //Updates cart text
}
  button.addEventListener("click", clickPlus);
})

donutDecrease.forEach((button, index) => {
  const clickMinus = () => {
    if (donuts[index].count > 0) { // Only runs when count text is bigger than 0
      donuts[index].count--; //Decrease -1 amount
      donutAmount[index].innerHTML = donuts[index].count;
      donutCountCart.innerHTML = getDonutCount();
    }
  }
  button.addEventListener("click", clickMinus);
})

const donutsContainer = document.getElementsByClassName("flex-content"); //array med div:en med ALLA munkar
const mainDonuts = document.getElementById("sort-container"); //creates container for '.appendChild()'
const form = document.getElementById("form-container"); // use for preference line at <form> in html

const sortPriceButtonAsc = sortingButtons[0]; //Button Sort price: High to low.
const sortPriceButtonDsc = sortingButtons[1]; // Button sort price: Low to high.

const sortPrice = (index) => {
  //creates a function for sorting price
  let sortedArray = []; //  empty array for sorted preferences
  let unSortedArray = []; //  empty array for comparison
  donuts.forEach((donut, j) => {
    // loop for every donut in 'donutsContainer'
    sortedArray.push(donut.price); //extracts prices from donuts into 'sortedArray'
    unSortedArray.push(   // extrac donuts prices from 'index.html' into 'unSortedArray'
      document.getElementsByClassName("donut-price")[j].innerHTML //gets the price
    );
  })

  const comparePrice = (price) => {  // compares all prices from unSortedArray with a price in sortedArray. until a match e.g 2===2
    return price === sortedArray[index];
  }

  let foundIndex = unSortedArray.findIndex(comparePrice); //finds index in unSortedArray where elements matches with the sortedArray. It compares with the current index recieved in this function.
  mainDonuts.insertBefore(donutsContainer[foundIndex], form); //insert the found donut above the reference; <form id="form-contianer"> in 'index.html'

  if (index < sortedArray.length - 1) { //index has to be -1 (less) than length because start on index 1
    sortPrice(index + 1); // if yes; then re-run function with +1 index. (starts on 2 next time etc)
  }
}

const sortPriceAsc = () => { 
  donuts.sort((donut1, donut2) => {   //sorts 'donuts array' by ascending price.
    return donut2.price - donut1.price;
  })
  sortPrice(1) //sorts index.html when compared to 'donuts array'. Starts at 1, wants to compare 2nd index in sortedArray first. "bubble sort-theory"
}
sortPriceButtonAsc.addEventListener("click", sortPriceAsc); //onlick function for sort triggers

const sortPriceDsc = () => { 
  donuts.sort((donut1, donut2) => {
    return donut1.price - donut2.price // sorts 'donuts array' by descending price
  })
  sortPrice(1);
}
sortPriceButtonDsc.addEventListener("click", sortPriceDsc); //onlick, run 'donuts.sort...'
