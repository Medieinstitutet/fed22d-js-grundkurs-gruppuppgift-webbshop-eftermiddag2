/*eslint-disable arrow-body-style */
/* eslint-disable spaced-comment */
const donutIncrease = document.querySelectorAll('.donut-amount-increase'); //all + btns
const donutDecrease = document.querySelectorAll('.donut-amount-reduce'); //all - btns
const donutCountCart = document.getElementById('donut-counter-cart'); //text in cart
// prettier-ignore
const donutCostSummary = document.getElementById('donut-cost-summary-container');
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
    count: Number(donut.childNodes[3].childNodes[7].childNodes[0].innerHTML),
    img: donut.childNodes[3].childNodes[3].childNodes[3].attributes[1]
      .nodeValue,
  });
});

donutCountCart.style.visibility = 'visible'; //check with group layout --------------------------

//   ---------------------------------------------------------------------------------------------------------------------
//   --------------------------------------------INCREASE & DECREASE BUTTON--------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------------
//

const basketSum = document.getElementsByClassName('basket-sum'); //variables for basket-sum
const discountText = document.getElementsByClassName('discount-text'); //variables for discount text

const isMonday03to10 = () => {
  //return true if it is monday 03:00-10:00, else return false
  const date = new Date(); // get today's date
  const time = date.getHours(); // get today's hours
  const isMonday = date.getDay() === 1; // if today is monday return true, else false

  return isMonday && time >= 3 && time < 10; // if true + true + true = return true, if true + true + false = return false
};

const isFriday15toMonday03 = () => {
  //return true if it is friday after 15:00 and before monday 03:00, else return false
  const date = new Date();
  const time = date.getHours();
  const isMonday = date.getDay() === 1; // check if its monday
  const isFriday = date.getDay() === 5; // check if its friday
  const isSaturday = date.getDay() === 6;
  const isSunday = date.getDay() === 0;

  return (
    (isFriday && time >= 15) || isSaturday || isSunday || (isMonday && time < 3)
  ); // one part has to be true to retun true, otherwise return false
};

const evenTuesday = () => {
  const currentDate = new Date(); // todays date

  let startDate = new Date(currentDate.getFullYear(), 0, 1); //first date of the year of current date. 0 = january. 1 = sunday 2022

  if (startDate.getDay() !== 1) {
    // if startDate IS NOT a monday, run code below
    for (let i = 2; i <= 7; i += 1) {
      startDate = new Date(currentDate.getFullYear(), 0, i); //change startDate to next day
      // when day matches monday -> break loop
      if (startDate.getDay() === 1) {
        break;
      }
    }
  }

  // number of days in the year
  const numberOfDays = Math.floor(
    (currentDate - startDate) / (24 * 60 * 60 * 1000)
  );
  // current week of the year
  const currentWeek = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
  const isEvenWeek = currentWeek % 2 === 0; // check even week nr
  const isTuesday = currentDate.getDay() === 2; // check if tuesday
  return isEvenWeek && isTuesday; // if isEvenWeek and isTuesday true return true
};

const checkLucia = () => {
  const date = new Date(); //todays date
  const monthDate = date.getMonth() + 1; // +1 because jan starts on 0
  const dayDate = date.getDate(); // get day of month

  const isDec = monthDate === 12; // if the month is 12 (december)
  const isLucia = dayDate === 13; // if day is 13

  return isDec && isLucia; // if both true -> return true
};

//   ---------------------------------------------------------------------------------------------------------------------
//   ---------------------------------------------CART SUM-------------------------------------------------------

const getDonutSum = () => {
  //total price of all donuts including discount for >10 donuts
  let sum = donuts.reduce((acc, { price, count }) => {
    //reduce function
    if (count >= 10) {
      return acc + price * count * 0.9; // 10% off the price for the donut that has more than 10 count
    }
    return acc + price * count;
  }, 0);

  if (evenTuesday() && sum > 25) {
    sum -= 25;
  }

  if (isMonday03to10()) {
    //if it is mondag between 03 to 10 o'clock -> sum - 10% off
    sum = Math.round(sum * 0.9);
    discountText[0].innerHTML = 'Måndagsrabatt: 10 % på hela beställningen'; //adds discount text if isMonday03to10 is true
  }
  if (isFriday15toMonday03()) {
    // scam prices on weekends
    sum = Math.round(sum * 1.15); // + 15% hidden price on total sum
  }

  return Math.round(sum); //round to nearest integer
};

const getDonutCount = () => {
  // total count for all donuts
  const totalCount = donuts.reduce((acc, { count }) => {
    // reduce function
    return acc + count;
  }, 0);
  return totalCount;
};

const updateCarts = () => {
  //update basketSum, donutCountCart and donutCostSummery in HTML.
  const sum = getDonutSum();

  donutCountCart.innerHTML = getDonutCount(); //set donutCountCart to getDonutCount
  donutCostSummary.childNodes[0].innerHTML = sum;
};

function detailsVisbility() {
  if (getDonutCount() <= 0) {
    donutCountCart.classList.add('hidden');
    donutCostSummary.classList.add('hidden');
  } else {
    donutCountCart.classList.remove('hidden');
    donutCostSummary.classList.remove('hidden');
  }
}

const clickPlusMinusMain = (e) => {
  const findBtn = e.currentTarget.innerHTML;
  const donutCounter =
    e.currentTarget.parentElement.querySelector('.donut-count');
  const donutName = e.currentTarget.parentElement.querySelector('.donut-name');
  //callback function to findIndex
  // search for index of donut name
  // find index where html donut-names matches with names in 'donuts'-object
  const indexOfName = ({ name }) => {
    return name === donutName.innerHTML;
  };
  const indexOfDonut = donuts.findIndex(indexOfName); // needs to be after 'indexOfName'
  //only do if count is bigger than 0
  if (donutCounter.innerHTML <= 0 && findBtn === 'remove') {
    return;
  }
  // all plus btns name is 'add'
  // if it is an 'add' btn -> +1
  if (findBtn === 'add') {
    donutCounter.innerHTML = Number(donutCounter.innerHTML) + 1;
    donuts[indexOfDonut].count += 1; // Where found match -> Adds +1 amount to property 'count' in 'donuts'-object
  }
  // all minus btns name is 'remove'
  // if it is an 'remove' btn -> -1
  if (findBtn === 'remove') {
    donutCounter.innerHTML = Number(donutCounter.innerHTML) - 1; // -1 amount to property 'count' in object
    donuts[indexOfDonut].count -= 1; // Where found match -> Adds -1 amount to property 'count' in 'donuts'-object
  }

  updateCarts(); //Updates cart text
  detailsVisbility();
};

//Loops over all increase buttons
donutIncrease.forEach((button) => {
  button.addEventListener('click', clickPlusMinusMain); //On click (on plus button), run function 'clickPlus'
});

//loops over all decrease btns
donutDecrease.forEach((button) => {
  button.addEventListener('click', clickPlusMinusMain);
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
  const sortedArray = []; //  empty array for sorted preferences
  const unSortedArray = []; //  empty array for comparison
  //creates a function for sorting types (e.g name + price)
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

  //index has to be -1 (less) than length because it starts on index 1
  if (index < sortedArray.length - 1) {
    // if yes; then re-run function with +1 index. (starts on 2 next time etc)
    if (type === 'name') {
      sortByType('name', index + 1);
    }
    // if yes; then re-run function with +1 index. (starts on 2 next time etc)
    if (type === 'price') {
      sortByType('price', index + 1);
    }
    // if yes; then re-run function with +1 index. (starts on 2 next time etc)
    if (type === 'rating') {
      sortByType('rating', index + 1);
    }
  }
};
// sort name
// sort array with objects of ascending proprerty name, from A-Ö.
const sortNameAscFn = (a, b) => {
  // compare first letter in a with first letter in b. Each letter (lower and upper) has different values e.g console.log("a".charCodeAt(0)) returns 97
  if (a.name < b.name) {
    return -1; //if return < 0 ---> sort a BEFORE b
  }
  if (a.name > b.name) {
    return 1; //if return < 0 ---> sort a AFTER b
  }
  return 0; // if its 0 ---> keep order
};

const sortNameAsc = () => {
  donuts.sort(sortNameAscFn); // sorts donuts by sortNameAsc()
  sortByType('name', 1); // sort name + start index which is 1
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
  sortByType('name', 1); // sort name + start index which is 1
};

sortNameBtnDesc.addEventListener('click', sortNameDesc);

const sortPriceAscFn = (a, b) => {
  //a & b is only made up arguments in this callback function
  return b.price - a.price; //sorts 'donuts array' by ascending price.
};

//sort price
const sortPriceAsc = () => {
  donuts.sort(sortPriceAscFn);
  sortByType('price', 1); // sort price + start index which is 1
};

sortPriceBtnAsc.addEventListener('click', sortPriceAsc);

const sortPriceDescFn = (a, b) => {
  return a.price - b.price; // sorts 'donuts array' by descending price
};

const sortPriceDesc = () => {
  donuts.sort(sortPriceDescFn);
  sortByType('price', 1); // sort price + start index which is 1
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
  // function to set 'display = flex' on all donuts with 'category-none' (noneArray)
  for (let i = 0; i < noneArray.length; i += 1) {
    noneArray[i].style.display = 'flex';
  }
};
const showGlaze = () => {
  // function to set 'display = flex' on all donuts with 'category-glaze' (glazeArray)
  for (let i = 0; i < glazeArray.length; i += 1) {
    glazeArray[i].style.display = 'flex';
  }
};
const showSprinkle = () => {
  // function to set 'display = flex' on all donuts with 'category-sprinkle' (sprinkleArray)
  for (let i = 0; i < sprinkleArray.length; i += 1) {
    sprinkleArray[i].style.display = 'flex';
  }
};
const hideAll = () => {
  // 'display = none on all donuts
  for (let i = 0; i < noneArray.length; i += 1) {
    noneArray[i].style.display = 'none';
  }
  for (let i = 0; i < glazeArray.length; i += 1) {
    glazeArray[i].style.display = 'none';
  }
  for (let i = 0; i < sprinkleArray.length; i += 1) {
    sprinkleArray[i].style.display = 'none';
  }
};

const filterGlaze = () => {
  // function that only shows donuts with 'category-glaze'
  hideAll(); // start with all donuts have 'display = none'
  showGlaze(); // only change 'display = flex' on donuts that is selected
};
// same reasoning as filterGlaze
const filterSprinkle = () => {
  hideAll();
  showSprinkle();
};
const filterNone = () => {
  hideAll();
  showNone();
};
// show all donuts
const filterAll = () => {
  showNone();
  showGlaze();
  showSprinkle();
};

filterBtnGlaze.addEventListener('click', filterGlaze); //when click on filterBtnGlaze, run filterGlaze function
filterBtnSprinkle.addEventListener('click', filterSprinkle);
filterBtnNone.addEventListener('click', filterNone);
filterBtnAll.addEventListener('click', filterAll);

//-------------------------------------------------------------------------------------
//----------------------------------SHOPPING CART--------------------------------------
//-------------------------------------------------------------------------------------

const cartContent = document.querySelector('.cart-content');
let cartPlusBtns = document.querySelectorAll('.cart-amount-increase');
let cartMinusBtns = document.querySelectorAll('.cart-amount-decrease');
let cartDeleteBtn = document.querySelectorAll('.cart-delete-donut');
const deliveryFee = document.getElementsByClassName('delivery-fee'); // 'Frakt' in cart
const totalFee = document.getElementsByClassName('basket-total'); // 'Totalt' in cart

const updateFeesCart = () => {
  const sumPrice = getDonutSum(); // 'Summa' in cart
  const totalDonutCount = getDonutCount(); //all donuts in cart

  //if there are 15 donuts or more -> 'deliveryFee'(frakt) equal '0'
  if (totalDonutCount >= 15) {
    deliveryFee[0].innerHTML = 0;
  }

  // if there is LESS than 15 donuts -> deliverFee + 10% of sumPrice
  if (totalDonutCount < 15) {
    deliveryFee[0].innerHTML = Math.round(25 + 0.1 * sumPrice); // deliveryFee is by default 25kr
  }
  basketSum[0].innerHTML = sumPrice;
  totalFee[0].innerHTML = Number(deliveryFee[0].innerHTML) + sumPrice; // totalFee = deliveryFee + sumPrice
};

const createDonut = () => {
  // creates a new donut in cart with HTML below. Uses for loop so that we dont need to re-write code for multiple donuts
  for (let i = 0; i < 10; i += 1) {
    if (donuts[i].count > 0) {
      // add html in cartContent
      cartContent.innerHTML += `
    <tr class="cart-delete">
      <td>
        <span>${donuts[i].name}</span>
        <br>
        <img class="donut-img" src="${
          donuts[i].img
        }" alt="Munk med socker" height="100" width="100" />
      </td>
      <td>
        <span class="cart-donut-count">${donuts[i].count}</span> st
        <br>
        <button class="cart-amount-decrease">-</button>
        <button class="cart-amount-increase">+</button>
      </td>
      <td>
        <span>${donuts[i].price}</span> kr/st
      </td>
      <td>
        <span class="cart-count">${donuts[i].price * donuts[i].count}</span> kr
      </td>
      <td>
        <button class="cart-delete-donut">Ta bort</button>
      </td>
    </tr>`;
    }
  }
  //if its lucia day -> create a lucia donut
  if (checkLucia()) {
    cartContent.innerHTML += `
    <tr class="cart-delete">
      <td>
        <span>Luciamunk</span>
        <br>
        <img src="assets/donuts/donut-lucia.jpg" alt="LuciaMunk" height="100" width="100" />
      </td>
      <td class ="lucia-donut">
          Du har fått en gratis Luciamunk!
      </td>
    </tr>`;
  }

  cartPlusBtns = document.querySelectorAll('.cart-amount-increase'); // all plus btns in cart
  cartMinusBtns = document.querySelectorAll('.cart-amount-decrease'); // all minus btns in cart
  cartDeleteBtn = document.querySelectorAll('.cart-delete-donut'); // all delete btns in cart

  const clickPlusMinusCart = (e) => {
    // identify which btn
    const findBtn = e.currentTarget.innerHTML;
    // donut count in cart
    const cartDonutCount = e.currentTarget.parentElement.childNodes[1];
    const cartDonutContainer = e.currentTarget.parentElement.parentElement;
    //name of donut from cart
    const cartDonutName =
      e.currentTarget.parentElement.previousElementSibling.childNodes[1]
        .innerHTML;
    const partSum = cartDonutContainer.childNodes[7].childNodes[1];
    // set NEW cart counter
    const newCartDonutCount = cartDonutCount.innerHTML;

    // find index in donuts-array where donut.name matches the button
    const indexOfDonutCart = donuts.findIndex(
      ({ name }) => name === cartDonutName
    );
    const donutsContainerArray = Array.from(donutsContainer); // convert donutsContainer to an array so that we can use 'findIndex'. Doesnt work on HTMLCollection
    const indexOfDonutFrontPage = donutsContainerArray.findIndex(
      // find index in donutsContainer-array where
      (donut) => donut.childNodes[3].childNodes[1].innerHTML === cartDonutName
    );

    //if it is -btn AND count is 0 or less -> return
    if (cartDonutCount.innerHTML <= 0 && findBtn === '-') {
      return;
    }
    // if it is +btn -> +1 count in main and in cart
    if (findBtn === '+') {
      cartDonutCount.innerHTML = Number(cartDonutCount.innerHTML) + 1;
      donuts[indexOfDonutCart].count += 1;
    }
    // if it is -btn -> +1 count in main and in cart

    if (findBtn === '-') {
      cartDonutCount.innerHTML = Number(cartDonutCount.innerHTML) - 1;
      donuts[indexOfDonutCart].count -= 1;
    }

    // set main page counter equal to cart counter
    donutsContainer[
      indexOfDonutFrontPage
    ].childNodes[3].childNodes[7].childNodes[0].innerHTML = newCartDonutCount;

    // tempPartSum + if + partSum.innerHTML = tempPartSum.
    // round to nearest integer
    let tempPartSum = Math.round(
      cartDonutContainer.childNodes[5].childNodes[1].innerHTML *
        donuts[indexOfDonutCart].count
    );

    //if there is 10 or more of the same donut -> tempPartSum and 10% price off
    if (donuts[indexOfDonutCart].count >= 10) {
      tempPartSum = Math.round(tempPartSum * 0.9);
    }

    partSum.innerHTML = tempPartSum;

    updateFeesCart(); //updates fees in cart
    updateCarts();
  };

  const clickDeleteCart = (e) => {
    const cartDonutName = //name of donut in cart
      e.currentTarget.parentElement.parentElement.childNodes[1].childNodes[1]
        .innerHTML;
    const deleteDonut = e.currentTarget.parentElement.parentElement;
    const donutsContainerArray = Array.from(donutsContainer);
    const indexOfDonutCart = donuts.findIndex(
      ({ name }) => name === cartDonutName
    );

    const indexOfDonutFrontPage = donutsContainerArray.findIndex(
      (donut) => donut.childNodes[3].childNodes[1].innerHTML === cartDonutName
    );

    donuts[indexOfDonutCart].count = 0; // set count for deleted donut to 0
    donutsContainer[
      indexOfDonutFrontPage
    ].childNodes[3].childNodes[7].childNodes[0].innerHTML = 0; // set count for deleted donut in main to 0

    deleteDonut.remove(); // remove selected donut

    updateFeesCart(); //update fees in cart
    updateCarts(); // update cart
  };

  // loop over every plus btns in cart
  cartPlusBtns.forEach((plusBtn) => {
    plusBtn.addEventListener('click', clickPlusMinusCart);
  });

  cartMinusBtns.forEach((minusBtn) => {
    minusBtn.addEventListener('click', clickPlusMinusCart);
  });

  cartDeleteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', clickDeleteCart);
  });
};
//when closing cart, remove all existing donuts in cart
//cart should be empty when closed. When open cart, create donuts and fees for the order
const defaultCart = () => {
  const cartDonuts = document.querySelectorAll('.cart-delete');
  cartDonuts.forEach((cartDonut) => {
    cartDonut.remove();
  });
};

const openBtn = document.querySelectorAll('#openCart');
const closeBtn = document.querySelectorAll('#closeCart');
const backdropShadow = document.querySelector('#shadowcast');
const cart = document.querySelectorAll('#shoppingCart');

// If you click on "Varukorg" the shopping cart will open
const openCart = () => {
  cart[0].classList.toggle('hidden');
  backdropShadow.classList.remove('hidden');

  filterAll(); //when open cart: show all donuts
  createDonut(); // when open cart: create ordered donuts from main in cart
  updateFeesCart(); // when open cart: update all fees in cart including discounts
};

// If you click on the button "Stäng" while the shopping cart is open it will close the shopping cart
const closeCart = () => {
  cart[0].classList.toggle('hidden');
  backdropShadow.classList.add('hidden');

  defaultCart();
};

openBtn[0].addEventListener('click', openCart);
closeBtn[0].addEventListener('click', closeCart);

const discountInput = document.getElementById('discount');
const discountCheckBtn = document.getElementsByClassName('discount-check');
const billOpt = document.getElementsByClassName('bill');
//move to error group but higher
const error13 = document.getElementById('error13');

const orderBtn = document.querySelectorAll('#order');
const showForm = document.querySelectorAll('#formContainer');
const formSum = document.getElementsByClassName('form-sum'); // sum in form

const checkDiscount = () => {
  error13.style.visibility = 'visible'; // show msg because input-field is empty
  if (discountInput.value === 'a_damn_fine-cup_of-coffee') {
    error13.innerHTML = 'Giltig rabattkod'; //change msg for discount
    formSum[0].innerHTML = 0; // change formSum to 0kr
    billOpt[0].removeAttribute('disabled'); // when sum is 0, billing option is enabled
  }
};

const finalOrderSum = () => {
  showForm[0].classList.toggle('hidden');
  cart[0].classList.toggle('hidden');
  formSum[0].innerHTML = totalFee[0].innerHTML; // set sum in form to total fee in cart
  if (Number(formSum[0].innerHTML) >= 800) {
    billOpt[0].setAttribute('disabled', ''); // disabled billing option
  }
};

const isbackDropShadow = () => {
  if (cart[0].classList.contains('hidden') === false) {
    cart[0].classList.add('hidden');
  }
  if (showForm[0].classList.contains('hidden') === false) {
    showForm[0].classList.add('hidden');
  }
  backdropShadow.classList.add('hidden');
};

discountCheckBtn[0].addEventListener('click', checkDiscount);
orderBtn[0].addEventListener('click', finalOrderSum); // The form will only be visible if you click on "Beställ"
backdropShadow.addEventListener('click', isbackDropShadow);

//filter price range
const inputLeft = document.getElementById('range-left');
const inputRight = document.getElementById('range-right');
const range = document.getElementById('range');
const priceFrom = document.querySelector('.price-from');
const priceTo = document.querySelector('.price-to');
const minLeft = Number(inputLeft.min);
const maxLeft = Number(inputLeft.max);
const minRight = Number(inputRight.min);
const maxRight = Number(inputRight.max);

const filterPriceLeft = () => {
  // destruct donuts.price
  donuts.forEach(({ price }, i) => {
    if (
      //If left value is BIGGER than price of donut && right value is BIGGER than price of donut
      Number(inputLeft.value) > Number(price) &&
      Number(inputRight.value) > Number(price)
    ) {
      //hide donut
      donutsContainer[i].style.display = 'none';
    }
    if (
      //If left value is SMALLER than price of donut && right value is BIGGER than price of donut
      Number(inputLeft.value) < Number(price) &&
      Number(inputRight.value) > Number(price)
    ) {
      //show donut
      donutsContainer[i].style.display = 'flex';
    }
  });
};

const setLeftValue = () => {
  //convert to number because 'inputLeft.min' is a string
  //Math.min return smalles number of given values
  inputLeft.value = Math.min(
    Number(inputLeft.value),
    Number(inputRight.value) - 1 // can only be 1 in difference between left slider and right slider
  );
  priceFrom.textContent = `${inputLeft.value}`; // change left slider value text
  const percent = ((inputLeft.value - minLeft) / (maxLeft - minLeft)) * 100; // calculating the % of the html-bar
  range.style.left = `${percent}%`; //moves the yellow bar % from left

  filterPriceLeft();
};

const filterPriceRight = () => {
  donuts.forEach(({ price }, i) => {
    if (
      Number(inputRight.value) < Number(price) && // if donut price is bigger than right slider's (of 'prisintervall') value AND
      Number(inputLeft.value) < Number(price) // if donut price is bigger than left slider's value
    ) {
      donutsContainer[i].style.display = 'none'; //display none if statements above is true
    }
    if (
      Number(inputRight.value) > Number(price) && //if right slider's value is bigger than donut price AND
      Number(inputLeft.value) < Number(price) // if donut price is bigger than left slider's value
    ) {
      donutsContainer[i].style.display = 'flex'; // display flex on donutsContainer
    }
  });
};

const setRightValue = () => {
  inputRight.value = Math.max(
    Number(inputRight.value),
    Number(inputLeft.value) + 1 // can only be 1 in difference between left slider and right slider
  );

  priceTo.textContent = `${inputRight.value}`; // change right slider value text
  //changes background of bar when left/right sliders moves
  const percent = ((inputRight.value - minRight) / (maxRight - minRight)) * 100;
  range.style.right = `${100 - percent}%`;

  filterPriceRight();
};

inputLeft.addEventListener('input', setLeftValue);
inputRight.addEventListener('input', setRightValue);

//God has abandoned me

//variabler för knappar
const slideshowLeft = document.querySelectorAll('.btn-left');
const slideshowRight = document.querySelectorAll('.btn-right');

function switchImage(image) {
  const imageSrc = image.getAttribute('src'); //Får attribut src
  let checkEnd = imageSrc.substr(imageSrc.length - 8); //Kollar av sista tecknerna
  checkEnd = checkEnd.slice(0, checkEnd.length - 4); //Kanske inte behövs om man ändrar if till "side.svg", men iaf, den tar bort .svg från variabeln.
  if (checkEnd !== 'side') {
    //Kollar ifall checkEnd redan är i "side"
    image.setAttribute(
      'src',
      `${imageSrc.slice(0, imageSrc.length - 4)}-side.svg`
    ); //Tar bort .svg från slutet, sätter in -side.svg
    //Kunde nog även gjort replace('.svg' '-side.svg')....
  } else {
    image.setAttribute('src', imageSrc.replace('-side', '')); //Om den hittar -side, ta bort den
  }
}

//Functioner för knapparna
const slideshowBtnRight = (e) => {
  const image = e.currentTarget.previousElementSibling; //Får sibling(bilden)
  switchImage(image);
};
const slideshowBtnLeft = (e) => {
  const image = e.currentTarget.nextElementSibling; //Samma sak som förra
  switchImage(image);
};

//Eventlisteners
slideshowLeft.forEach((btn) => {
  btn.addEventListener('click', slideshowBtnLeft);
});
slideshowRight.forEach((btn) => {
  btn.addEventListener('click', slideshowBtnRight);
});

//-------------------------------------------------------------------------------------
//---------------------------------------FORM------------------------------------------
//-------------------------------------------------------------------------------------

//Variables for the input fields
const firstNameField = document.querySelector('#name');
const lastNameField = document.querySelector('#lastName');
const addressField = document.querySelector('#address');
const postNumberField = document.querySelector('#postNumber');
const localityField = document.querySelector('#locality');
//const doorCodeField = document.querySelector('#doorCode'); No need to validate doorcode?
const phoneNumberField = document.querySelector('#phoneNumber');
const eMailField = document.querySelector('#eMail');
const cardNumberField = document.querySelector('#cardNumber');
const dateField = document.querySelector('#date');
const cvcField = document.querySelector('#cvc');
/*const discountField = document.querySelector('#discount'); */
const socialNumberField = document.querySelector('#socialNumber');

//Variables used for hiding some inputs
const methodOfPayment = document.querySelector('#payMethod');

const hiddenInputs = document.querySelectorAll(
  '#hideInput1, #hideInput2, #hideInput3, #hideInput4'
);

//Variables for the buttons
const sendBtn = document.querySelector('#sendBtn'); // 'skicka beställning'
const clearBtn = document.getElementById('clearBtn'); //'rensa beställning' btn
const resetForm = document.getElementById('formContainer'); // form

clearBtn.addEventListener('click', () => {
  resetForm.reset(); // reset form
  cartDeleteBtn.forEach((deleteBtn) => {
    // delete donuts in cart when clearBtn is clicked on
    deleteBtn.click();
  });
  defaultCart();
});

//Variables for errors  FIX: Rename the errors maybe?
const error1 = document.querySelector('#error1');
const error2 = document.querySelector('#error2');
const error3 = document.querySelector('#error3');
const error4 = document.querySelector('#error4');
const error5 = document.querySelector('#error5');
const error6 = document.querySelector('#error6');
const error7 = document.querySelector('#error7');
//const error8 = document.querySelector('error8'); this error is for when the user has not selected a method of payment
const error9 = document.querySelector('#error9');
const error10 = document.querySelector('#error10');
const error11 = document.querySelector('#error11');
const error12 = document.querySelector('#error12');

//Keep track if fields have correct values
let validName = false;
let validLastName = false;
let validAddress = false;
let validPostNumber = false;
let validLocality = false;
let validPhoneNumber = false;
let validEMail = false;
let validCardNumber = false;
let validDate = false;
let validCvc = false;
/*let validDiscount = false; */
let validSocialNumber = false;

//Activates the button "skicka beställning" if all values are true
function activateSendBtn() {
  if (
    validName &&
    validLastName &&
    validAddress &&
    validPostNumber &&
    validLocality &&
    validPhoneNumber &&
    validEMail &&
    validCardNumber &&
    validDate &&
    validCvc &&
    validSocialNumber
  ) {
    //add the other functions

    sendBtn.removeAttribute('disabled');
  } else {
    sendBtn.setAttribute('disabled', '');
  }
}

//Functions to check if the input fields are valid
function checkName() {
  if (firstNameField.value !== '' || firstNameField.value == null) {
    //if there's something written in the namefield it's valid
    validName = true;
    error1.classList.add('error-hidden1');
  } else {
    validName = false;
    error1.classList.remove('error-hidden1');
  }
  activateSendBtn();
}

function checkLastName() {
  if (lastNameField.value !== '' || lastNameField.value == null) {
    //if there's something written in the lastnamefield it's valid
    validLastName = true;
    error2.classList.add('error-hidden2');
  } else {
    validLastName = false;
    error2.classList.remove('error-hidden2');
  }
  activateSendBtn();
}

function checkAddress() {
  if (addressField.value.indexOf(' ') > -1) {
    //address is valid if there's a space in the input field
    validAddress = true;
    error3.classList.add('error-hidden3');
  } else {
    validAddress = false;
    error3.classList.remove('error-hidden3');
  }
  activateSendBtn();
}

function checkPostNumber() {
  if (/^[0-9]{3}\s?[0-9]{2}$/.test(postNumberField.value)) {
    validPostNumber = true;
    error4.classList.add('error-hidden4');
  } else {
    validPostNumber = false;
    error4.classList.remove('error-hidden4');
  }
  activateSendBtn();
}

function checkLocality() {
  if (localityField.value !== '' || localityField.value == null) {
    //if there's something written in the locality field it's valid
    validLocality = true;
    error5.classList.add('error-hidden5');
  } else {
    validLocality = false;
    error5.classList.remove('error-hidden5');
  }
  activateSendBtn();
}

function checkPhoneNumber() {
  if (/^07[\d]{1}-?[\d]{7}$/.test(phoneNumberField.value)) {
    validPhoneNumber = true;
    error6.classList.add('error-hidden6');
  } else {
    validPhoneNumber = false;
    error6.classList.remove('error-hidden6');
  }
  activateSendBtn();
}

function checkEMail() {
  if (/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(eMailField.value)) {
    validEMail = true;
    error7.classList.add('error-hidden7');
  } else {
    validEMail = false;
    error7.classList.remove('error-hidden7');
  }
  activateSendBtn();
}

function checkCardNumber() {
  if (cardNumberField.value !== null) {
    validCardNumber = true;
    error9.classList.add('error-hidden9');
  } else {
    validCardNumber = false;
    error9.classList.remove('error-hidden9');
  }
  activateSendBtn();
}

function checkDate() {
  if (dateField.value !== null) {
    validDate = true;
    error10.classList.add('error-hidden10');
  } else {
    validDate = false;
    error10.classList.remove('error-hidden10');
  }
  activateSendBtn();
}

function checkCvc() {
  if (cvcField.value !== null) {
    validCvc = true;
    error11.classList.add('error-hidden11');
  } else {
    validCvc = false;
    error11.classList.remove('error-hidden11');
  }
  activateSendBtn();
}

function checkSocialNumber() {
  if (
    /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/.test(
      socialNumberField.value
    )
  ) {
    //FIX! Use regex to validate
    validSocialNumber = true;
    error12.classList.add('error-hidden12');
  } else {
    validSocialNumber = false;
    error12.classList.remove('error-hidden12');
  }
  activateSendBtn();
}

//Check values on input field
firstNameField.addEventListener('change', checkName);
lastNameField.addEventListener('change', checkLastName);
addressField.addEventListener('change', checkAddress);
postNumberField.addEventListener('change', checkPostNumber);
localityField.addEventListener('change', checkLocality);
//doorCodeField.addEventListener('change', checkDoorCode); No need to validate doorcode?
phoneNumberField.addEventListener('change', checkPhoneNumber);
eMailField.addEventListener('change', checkEMail);
cardNumberField.addEventListener('change', checkCardNumber);
dateField.addEventListener('change', checkDate);
cvcField.addEventListener('change', checkCvc);
/*discountField.addEventListener('change', checkDiscount); */
socialNumberField.addEventListener('change', checkSocialNumber);

methodOfPayment.addEventListener('change', (event) => {
  //If card is chosen as method of payment
  if (event.target.value === 'card') {
    //the hidden input fields will be displayed as blocks
    hiddenInputs[0].style.display = 'block';
    hiddenInputs[1].style.display = 'block';
    hiddenInputs[2].style.display = 'block';
  } else {
    hiddenInputs[0].style.display = 'none';
    hiddenInputs[1].style.display = 'none';
    hiddenInputs[2].style.display = 'none';
  }
});

methodOfPayment.addEventListener('change', (event) => {
  //If bill is chosen as method of payment
  if (event.target.value === 'bill') {
    //the hidden input field "social number" will be dispalyed as a block
    hiddenInputs[3].style.display = 'block';
  } else {
    hiddenInputs[3].style.display = 'none';
  }
});

methodOfPayment.addEventListener('change', (event) => {
  if (
    (event.target.value === 'bill' && //If the option "bill" is chosen the cardnumber, date and cvc will be true if empty
      cardNumberField.value === '') ||
    (cardNumberField.value == null && //because those inputs are not needed if you don't pay with card
      dateField.value === '') ||
    (dateField.value == null && cvcField.value === '') ||
    cvcField.value == null
  ) {
    validCardNumber = true;

    validDate = true;
    validCvc = true;
  } else {
    validCardNumber = false;
    validDate = false;
    validCvc = false;
  }
  activateSendBtn();
});

methodOfPayment.addEventListener('change', (event) => {
  if (
    (event.target.value === 'card' && socialNumberField.value === '') ||
    socialNumberField == null
  ) {
    validSocialNumber = true;
  } else {
    validSocialNumber = false;
  }
  activateSendBtn();
});
