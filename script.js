const donutIncrease = document.querySelectorAll(".donut-amount-increase"); //all + btns
const donutDecrease = document.querySelectorAll(".donut-amount-reduce"); //all - btns
const donutCountCart = document.getElementById("donut-counter-cart"); //text in cart
const sortingButtons = document.querySelectorAll(".sorting-type"); //filter btns

const donutsContainer = document.getElementsByClassName("flex-content"); //array med div:en med ALLA munkar
const mainDonuts = document.getElementById("sort-container"); //creates container for 'insertBefore'
const form = document.getElementById("form-container"); // use for reference position line at <form> in html

let donuts = []; //creates an empty array
//Puts all amounts of donuts to 0, and makes sure we have variables for every donut
donutIncrease.forEach((_, index) => {  //Loops through lenght of 'donutIncrease' which is = amount of donus. Could also use for-loop
  donuts.push({    //push objects to 'donuts'-array.
    // Creates an object with properties 'name, price, count'
    name: document.getElementsByClassName("donut-name")[index].innerHTML,
    price: document.getElementsByClassName("donut-price")[index].innerHTML,
  })
})

donutCountCart.style.visibility = "visible";


//   ---------------------------------------------------------------------------------------------------------------------
//   ---------------------------------------------CART SUM-------------------------------------------------------

const getDonutCount = () => {
  let sum = 0; // sum starts at 0
  for (let i = 0; i < donutsContainer.length; i++){ //loop
    sum += donutsContainer[i].querySelector(".donut-price").innerHTML * donutsContainer[i].querySelector(".donut-count").innerHTML; // sum = sum+price*st
  }
  return sum + " kr";
}


//   ---------------------------------------------------------------------------------------------------------------------
//   --------------------------------------------INCREASE & DECREASE BUTTON--------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------
//

const clickPlus = (e) => {  // donuts[index].count++;
  e.currentTarget.parentElement.querySelector('.donut-count').innerHTML++;  // donutAmount[index].innerHTML++; //Adds +1 amount to property 'count' in object
  donutCountCart.innerHTML = getDonutCount(); //Updates cart text
}


const clickMinus = (e) => {  // donuts[index].count++;
  if (e.currentTarget.parentElement.querySelector('.donut-count').innerHTML > 0) { 
    e.currentTarget.parentElement.querySelector('.donut-count').innerHTML--;  // donutAmount[index].innerHTML++; //Adds +1 amount to property 'count' in object
    donutCountCart.innerHTML = getDonutCount(); //Updates cart text
  }
}

donutIncrease.forEach((button) => {  //Loops over all increase buttons
  button.addEventListener("click", clickPlus); //On click (on plus button), run function 'clickPlus'
})

donutDecrease.forEach((button) => { //loops over all decrease btns
  button.addEventListener("click", clickMinus);
})


// ------------------------------------------------------------------------------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------
//   -------------------------------------SORTING FUNCTION-----------------------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------

const sortPriceButtonAsc = sortingButtons[0]; //Button Sort price: High to low.
const sortPriceButtonDsc = sortingButtons[1]; // Button sort price: Low to high.

const sortPrice = (index) => {  //creates a function for sorting price
  let sortedArray = [];   //  empty array for sorted preferences
  let unSortedArray = []; //  empty array for comparison
  donuts.forEach((donut, j) => {    // '.forEach' loops for every donut in 'donutsContainer'
    sortedArray.push(donut.price); //extracts prices from donuts into 'sortedArray'
    unSortedArray.push(   // extracts donuts prices from 'index.html' into 'unSortedArray'
      document.getElementsByClassName("donut-price")[j].innerHTML //gets the price
    );
  })

  const comparePrice = (price) => {  // compares all prices from unSortedArray with a price in sortedArray. until a match e.g 2===2
    return price === sortedArray[index];
  }

  let foundIndex = unSortedArray.findIndex(comparePrice); //finds index in unSortedArray where elements matches with the sortedArray. It compares with the current index recieved in this function.
  mainDonuts.insertBefore(donutsContainer[foundIndex], form); //insert the found donut above the position preference; <form id="form-contianer"> in 'index.html'

  if (index < sortedArray.length - 1) { //index has to be -1 (less) than length because it starts on index 1
    sortPrice(index + 1); // if yes; then re-run function with +1 index. (starts on 2 next time etc)
  }
}

const sortPriceAsc = () => {
  donuts.sort((donut1, donut2) => {
    return donut2.price - donut1.price;   //sorts 'donuts array' by ascending price.
  })
  sortPrice(1) //sorts index.html when compared to 'donuts array'. Starts at 1, wants to compare 2nd index in sortedArray first. "bubble sort-theory"
}
sortPriceButtonAsc.addEventListener("click", sortPriceAsc); //onlick, run function 'sortPriceAsc'

const sortPriceDsc = () => {
  donuts.sort((donut1, donut2) => {
    return donut1.price - donut2.price // sorts 'donuts array' by descending price
  })
  sortPrice(1);
}
sortPriceButtonDsc.addEventListener("click", sortPriceDsc); //onlick, run function 'sortPriceDsc'
