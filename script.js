/*eslint-disable arrow-body-style */
/* eslint-disable spaced-comment */

const donutIncrease = document.querySelectorAll('.donut-amount-increase'); //all + btns
const donutDecrease = document.querySelectorAll('.donut-amount-reduce'); //all - btns
const donutCountCart = document.getElementById('donut-counter-cart'); //text in cart
const donutCostSummary = document.getElementById('donut-cost-summary-container');
const sortingButtons = document.querySelectorAll('.sorting-type'); //filter btns
const donutsContainer = document.getElementsByClassName('flex-content'); //array med div:en med ALLA munkar
const mainDonuts = document.getElementById('sort-container'); //creates container for 'insertBefore'
const form = document.getElementById('form-container'); // use for reference position line at <form> in html
const basketSum = document.getElementsByClassName('basket-sum'); //variables for basket-sum
const backdropShadow = document.querySelector('#shadowcast'); // bg-effect

// christmas theme
const priceTexts = document.querySelectorAll('.price-text');
const backgroundStyle = document.querySelector('.content-container');
const banner = document.querySelector('.banner');
const bannerText = document.querySelector('.banner>h1');

// sort btn for ascending and descending price, name and rating
const sortPriceBtnAsc = sortingButtons[0];
const sortPriceBtnDesc = sortingButtons[1];
const sortNameBtnAsc = sortingButtons[2];
const sortNameBtnDesc = sortingButtons[3];
const sortRatingBtnAsc = sortingButtons[4];
const sortRatingBtnDesc = sortingButtons[5];

//filter btns
const filterBtns = document.querySelectorAll('.filter-type');
const filterBtnGlaze = filterBtns[0];
const filterBtnSprinkle = filterBtns[1];
const filterBtnNone = filterBtns[2];
const filterBtnAll = filterBtns[3];

//donut categories
const noneArray = document.getElementsByClassName('category-none');
const sprinkleArray = document.getElementsByClassName('category-sprinkle');
const glazeArray = document.getElementsByClassName('category-glaze');

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

//slideshows btn
const slideshowLeft = document.querySelectorAll('.btn-left');
const slideshowRight = document.querySelectorAll('.btn-right');

// btns in cart
const cartContent = document.querySelector('.cart-content');
let cartPlusBtns = document.querySelectorAll('.cart-amount-increase');
let cartMinusBtns = document.querySelectorAll('.cart-amount-decrease');
let cartDeleteBtn = document.querySelectorAll('.cart-delete-donut');
const deliveryFee = document.getElementsByClassName('delivery-fee'); // 'Frakt' in cart
const totalFee = document.getElementsByClassName('basket-total'); // 'Totalt' in cart
const openBtn = document.querySelectorAll('#openCart');
const closeBtn = document.querySelectorAll('#closeCart');
const cart = document.querySelectorAll('#shoppingCart');

//input fields in form
const firstNameField = document.querySelector('#name');
const lastNameField = document.querySelector('#lastName');
const addressField = document.querySelector('#address');
const postNumberField = document.querySelector('#postNumber');
const localityField = document.querySelector('#locality');
const phoneNumberField = document.querySelector('#phoneNumber');
const eMailField = document.querySelector('#eMail');
const cardNumberField = document.querySelector('#cardNumber');
const dateField = document.querySelector('#date');
const cvcField = document.querySelector('#cvc');
const socialNumberField = document.querySelector('#socialNumber');
const discountInput = document.getElementById('discount');
const discountCheckBtn = document.getElementsByClassName('discount-check');
const discountText = document.getElementsByClassName('discount-text');
const billOpt = document.getElementsByClassName('bill');
const methodOfPayment = document.querySelector('#payMethod');
const hiddenInputs = document.querySelectorAll('#hideInput1, #hideInput2, #hideInput3, #hideInput4');

// form
const formContainer = document.querySelector('#formContainer');
const orderBtn = document.querySelectorAll('#order');
const showForm = document.querySelectorAll('#formContainer');
const closeFormBtn = document.querySelector('#closeFormBtn');
const formSum = document.getElementsByClassName('form-sum');

//form btns
const sendBtn = document.querySelector('#sendBtn');
const clearBtn = document.getElementById('clearBtn');
const resetForm = document.getElementById('formContainer');
const closeConfirmBtn = document.getElementById('closeConfirmBtn');
const confirmationMessage = document.querySelector('#orderConfirm');
const orderConfirm = document.querySelector('#summaryConfirm');

//form confirmations
const deliveryTime = document.getElementsByClassName('deliver-time')[0];
const deliveryCount = document.getElementsByClassName('deliver-nr-donuts')[0];

//Variables for errors
const error1 = document.querySelector('#error1');
const error2 = document.querySelector('#error2');
const error3 = document.querySelector('#error3');
const error4 = document.querySelector('#error4');
const error5 = document.querySelector('#error5');
const error6 = document.querySelector('#error6');
const error7 = document.querySelector('#error7');
const error9 = document.querySelector('#error9');
const error10 = document.querySelector('#error10');
const error11 = document.querySelector('#error11');
const error12 = document.querySelector('#error12');
const error13 = document.getElementById('error13');

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
let validSocialNumber = false;

const donuts = []; //creates an empty array
const tempDonutContainer = [...donutsContainer]; // copy array

tempDonutContainer.forEach((donut) => {
  //Loops through lenght of 'donutIncrease' which is = amount of donus. Could also use for-loop
  donuts.push({
    //push objects to 'donuts'-array.
    // Creates an object with properties 'name, price, count'
    name: donut.childNodes[3].childNodes[1].innerHTML,
    price: donut.childNodes[3].childNodes[5].childNodes[0].innerHTML,
    rating: donut.childNodes[3].childNodes[9].childNodes[1].innerHTML,
    count: Number(donut.childNodes[3].childNodes[7].childNodes[0].innerHTML),
    img: donut.childNodes[3].childNodes[3].childNodes[3].attributes[1].nodeValue,
  });
});

// -------------------------------------------------------------------------------------------------------
// Check special rules------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

function isMonday03to10() {
  const date = new Date();
  const time = date.getHours();
  const isMonday = date.getDay() === 1;

  return isMonday && time >= 3 && time < 10;
  // if true + true + true = return true, if true + true + false = return false
}

function isFriday15toMonday03() {
  const date = new Date();
  const time = date.getHours();
  const getDay = date.getDay();
  const isMonday = getDay === 1;
  const isFriday = getDay === 5;
  const isSaturday = getDay === 6;
  const isSunday = getDay === 0;

  return (isFriday && time >= 15) || isSaturday || isSunday || (isMonday && time < 3);
}

function evenTuesday() {
  const currentDate = new Date();

  //first date of the year of current date. 0 = january. 1 = sunday 2022
  let startDate = new Date(currentDate.getFullYear(), 0, 1);

  if (startDate.getDay() !== 1) {
    for (let i = 2; i <= 7; i += 1) {
      startDate = new Date(currentDate.getFullYear(), 0, i);
      if (startDate.getDay() === 1) {
        break;
      }
    }
  }

  const numberOfDays = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
  const isEvenWeek = currentWeek % 2 === 0;
  const isTuesday = currentDate.getDay() === 2;
  return isEvenWeek && isTuesday;
}

function checkLucia() {
  const date = new Date();
  const monthDate = date.getMonth() + 1;
  const dayDate = date.getDate();

  const isDec = monthDate === 12;
  const isLucia = dayDate === 13;

  return isDec && isLucia;
}

function layoutChristmas() {
  priceTexts.forEach((priceText) => {
    const tempPriceText = priceText;
    tempPriceText.style.color = 'red';
  });

  backgroundStyle.style.backgroundImage = 'url("assets/christmas/christmas-background.png")';

  banner.style.backgroundColor = 'rgba(0,0,0,0)';
  bannerText.style.color = 'white';
}

function isItChristmas() {
  const date = new Date();

  const christmas = {
    month: 11,
    day: 24,
  };

  return date.getMonth() === christmas.month && date.getDate() === christmas.day;
}

function christmasCheck() {
  if (isItChristmas()) {
    layoutChristmas();
  }
}
christmasCheck();

// -------------------------------------------------------------------------------------------------------
// Cart with update prices--------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

// 10% off the price for the donut that has more than 10 count
function calcDonutSum(acc, { price, count }) {
  if (count >= 10) {
    return acc + price * count * 0.9;
  }
  return acc + price * count;
}
//total price of all donuts including discount for >10 donuts
function getDonutSum() {
  let sum = donuts.reduce(calcDonutSum, 0);

  if (evenTuesday() && sum > 25) {
    sum -= 25;
  }
  //if it is mondag between 03 to 10 o'clock -> sum - 10% off -> + 15% hidden price on total sum
  if (isMonday03to10()) {
    sum = Math.round(sum * 0.9);
    discountText[0].innerHTML = 'Måndagsrabatt: 10 % på hela beställningen';
  }
  // scam prices on weekends -> +15%
  if (isFriday15toMonday03()) {
    sum = Math.round(sum * 1.15);
  }

  return Math.round(sum);
}

function calcDonutCount(acc, { count }) {
  return acc + count;
}

function getDonutCount() {
  const totalCount = donuts.reduce(calcDonutCount, 0);
  return totalCount;
}

function updateCarts() {
  const sum = getDonutSum();
  donutCountCart.innerHTML = getDonutCount(); //set donutCountCart to getDonutCount
  donutCostSummary.childNodes[0].innerHTML = sum;
}

function detailsVisbility() {
  if (getDonutCount() <= 0) {
    donutCountCart.classList.add('hidden');
    donutCostSummary.classList.add('hidden');
  } else {
    donutCountCart.classList.remove('hidden');
    donutCostSummary.classList.remove('hidden');
  }
}

// -------------------------------------------------------------------------------------------------------
// Add/remove/sort---------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

function clickPlusMinusMain(e) {
  const findBtn = e.currentTarget.innerHTML;
  const donutCounter = e.currentTarget.parentElement.querySelector('.donut-count');
  const donutName = e.currentTarget.parentElement.querySelector('.donut-name');

  // find index where html donut-names matches with names in 'donuts'-object
  function indexOfName({ name }) {
    return name === donutName.innerHTML;
  }
  const indexOfDonut = donuts.findIndex(indexOfName);

  if (donutCounter.innerHTML <= 0 && findBtn === 'remove') {
    return;
  }

  if (findBtn === 'add') {
    donutCounter.innerHTML = Number(donutCounter.innerHTML) + 1;
    donuts[indexOfDonut].count += 1;
    // Where found match -> Adds +1 amount to property 'count' in 'donuts'-object
  }

  if (findBtn === 'remove') {
    donutCounter.innerHTML = Number(donutCounter.innerHTML) - 1;
    donuts[indexOfDonut].count -= 1;
    // Where found match -> Adds -1 amount to property 'count' in 'donuts'-object
  }

  updateCarts();
  detailsVisbility();
}

function increaseBtn(button) {
  button.addEventListener('click', clickPlusMinusMain);
}

function decreaseBtn(button) {
  button.addEventListener('click', clickPlusMinusMain);
}

//For sortByType to work, index MUST start at 1
function sortByType(type, index) {
  const sortedArray = [];
  const unSortedArray = [];
  function sortTypeFn(donut, j) {
    sortedArray.push(donut[type]);
    unSortedArray.push(document.getElementsByClassName(`donut-${type}`)[j].innerHTML);
  }

  donuts.forEach(sortTypeFn);
  function compare(value) {
    return value === sortedArray[index];
  }
  //finds index in unSortedArray where elements matches with the sortedArray. It compares with the current index recieved in this function.
  const foundIndex = unSortedArray.findIndex(compare);
  mainDonuts.insertBefore(donutsContainer[foundIndex], form);

  if (index < sortedArray.length - 1) {
    if (type === 'name') {
      sortByType('name', index + 1);
    }

    if (type === 'price') {
      sortByType('price', index + 1);
    }

    if (type === 'rating') {
      sortByType('rating', index + 1);
    }
  }
}

function sortNameAscFn(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function sortNameAsc() {
  donuts.sort(sortNameAscFn);
  sortByType('name', 1);
}

function sortNameDescFn(a, b) {
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
}

function sortNameDesc() {
  donuts.sort(sortNameDescFn);
  sortByType('name', 1);
}

function sortPriceAscFn(a, b) {
  return b.price - a.price;
}

function sortPriceAsc() {
  donuts.sort(sortPriceAscFn);
  sortByType('price', 1);
}

function sortPriceDescFn(a, b) {
  return a.price - b.price;
}

function sortPriceDesc() {
  donuts.sort(sortPriceDescFn);
  sortByType('price', 1);
}

function sortRatingAscFn(a, b) {
  return b.rating - a.rating;
}

function sortRatingAsc() {
  donuts.sort(sortRatingAscFn);
  sortByType('rating', 1);
}

function sortRatingDescFn(a, b) {
  return a.rating - b.rating;
}

function sortRatingDesc() {
  donuts.sort(sortRatingDescFn);
  sortByType('rating', 1);
}

function showNone() {
  for (let i = 0; i < noneArray.length; i += 1) {
    noneArray[i].style.display = 'flex';
  }
}
function showGlaze() {
  for (let i = 0; i < glazeArray.length; i += 1) {
    glazeArray[i].style.display = 'flex';
  }
}
function showSprinkle() {
  for (let i = 0; i < sprinkleArray.length; i += 1) {
    sprinkleArray[i].style.display = 'flex';
  }
}

function hideAll() {
  for (let i = 0; i < noneArray.length; i += 1) {
    noneArray[i].style.display = 'none';
  }
  for (let i = 0; i < glazeArray.length; i += 1) {
    glazeArray[i].style.display = 'none';
  }
  for (let i = 0; i < sprinkleArray.length; i += 1) {
    sprinkleArray[i].style.display = 'none';
  }
}

// function that only shows donuts with 'category-glaze'
// start with all donuts have 'display = none'
// only change 'display = flex' on donuts that is selected
function filterGlaze() {
  hideAll();
  showGlaze();
}

function filterSprinkle() {
  hideAll();
  showSprinkle();
}

function filterNone() {
  hideAll();
  showNone();
}

function filterAll() {
  showNone();
  showGlaze();
  showSprinkle();
}

function filterPriceLeft() {
  donuts.forEach(({ price }, i) => {
    if (Number(inputLeft.value) > Number(price) && Number(inputRight.value) > Number(price)) {
      //hide donut
      donutsContainer[i].style.display = 'none';
    }
    if (Number(inputLeft.value) < Number(price) && Number(inputRight.value) > Number(price)) {
      donutsContainer[i].style.display = 'flex';
    }
  });
}

function setLeftValue() {
  inputLeft.value = Math.min(
    Number(inputLeft.value),
    Number(inputRight.value) - 1 // can only be 1 in difference between left slider and right slider
  );

  // change left slider value text. Calculating the % of the html-bar. Moves the yellow bar % from left
  priceFrom.textContent = `${inputLeft.value}`;
  const percent = ((inputLeft.value - minLeft) / (maxLeft - minLeft)) * 100;
  range.style.left = `${percent}%`;

  filterPriceLeft();
}

function filterPriceRight() {
  donuts.forEach(({ price }, i) => {
    if (Number(inputRight.value) < Number(price) && Number(inputLeft.value) < Number(price)) {
      donutsContainer[i].style.display = 'none';
    }
    if (Number(inputRight.value) > Number(price) && Number(inputLeft.value) < Number(price)) {
      donutsContainer[i].style.display = 'flex';
    }
  });
}

function setRightValue() {
  inputRight.value = Math.max(
    Number(inputRight.value),
    Number(inputLeft.value) + 1
    // can only be 1 in difference between left slider and right slider
  );

  // change right slider value text. Changes background of bar when left/right sliders moves
  priceTo.textContent = `${inputRight.value}`;
  const percent = ((inputRight.value - minRight) / (maxRight - minRight)) * 100;
  range.style.right = `${100 - percent}%`;

  filterPriceRight();
}

function updateFeesCart() {
  const sumPrice = getDonutSum();
  const totalDonutCount = getDonutCount();

  if (totalDonutCount >= 15) {
    deliveryFee[0].innerHTML = 0;
  }

  if (totalDonutCount < 15) {
    deliveryFee[0].innerHTML = Math.round(25 + 0.1 * sumPrice);
  }
  basketSum[0].innerHTML = sumPrice;
  totalFee[0].innerHTML = Number(deliveryFee[0].innerHTML) + sumPrice;
}
// creates a new donut in cart with HTML
function createDonut() {
  for (let i = 0; i < 10; i += 1) {
    if (donuts[i].count > 0) {
      cartContent.innerHTML += `
    <tr class="cart-delete">
      <td>
        <span>${donuts[i].name}</span>
        <br>
        <img class="donut-img" src="${donuts[i].img}" alt="Munk med socker" height="100" width="100" />
      </td>
      <td>
        <span class="cart-donut-count">${donuts[i].count}</span> st
        <br>
        <button class="cart-amount-decrease button-style">-</button>
        <button class="cart-amount-increase button-style">+</button>
      </td>
      <td>
        <span>${donuts[i].price}</span> kr/st
      </td>
      <td>
        <span class="cart-count price-text">${donuts[i].price * donuts[i].count}</span> kr
      </td>
      <td>
        <button class="cart-delete-donut button-style">Ta bort</button>
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

  function clickPlusMinusCart(e) {
    const findBtn = e.currentTarget.innerHTML; // identify which btn
    const cartDonutCount = e.currentTarget.parentElement.childNodes[1];
    const cartDonutContainer = e.currentTarget.parentElement.parentElement;
    const cartDonutName = e.currentTarget.parentElement.previousElementSibling.childNodes[1].innerHTML;
    const partSum = cartDonutContainer.childNodes[7].childNodes[1];
    const newCartDonutCount = cartDonutCount.innerHTML;
    function indexOfDonutName({ name }) {
      return name === cartDonutName;
    }
    // find index in donuts-array where donut.name matches the button
    const indexOfDonutCart = donuts.findIndex(indexOfDonutName);
    const donutsContainerArray = Array.from(donutsContainer); // convert donutsContainer to an array so that we can use 'findIndex'.
    const indexOfDonutFrontPage = donutsContainerArray.findIndex(
      (donut) => donut.childNodes[3].childNodes[1].innerHTML === cartDonutName
    );

    if (cartDonutCount.innerHTML <= 0 && findBtn === '-') {
      return;
    }

    if (findBtn === '+') {
      cartDonutCount.innerHTML = Number(cartDonutCount.innerHTML) + 1;
      donuts[indexOfDonutCart].count += 1;
    }

    if (findBtn === '-') {
      cartDonutCount.innerHTML = Number(cartDonutCount.innerHTML) - 1;
      donuts[indexOfDonutCart].count -= 1;
    }

    // set main page counter equal to cart counter
    donutsContainer[indexOfDonutFrontPage].childNodes[3].childNodes[7].childNodes[0].innerHTML =
      newCartDonutCount;

    let tempPartSum = Math.round(
      cartDonutContainer.childNodes[5].childNodes[1].innerHTML * donuts[indexOfDonutCart].count
    );

    if (donuts[indexOfDonutCart].count >= 10) {
      tempPartSum = Math.round(tempPartSum * 0.9);
    }

    partSum.innerHTML = tempPartSum;

    updateFeesCart();
    updateCarts();
  }

  function clickDeleteCart(e) {
    const cartDonutName =
      e.currentTarget.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML;
    const deleteDonut = e.currentTarget.parentElement.parentElement;
    const donutsContainerArray = Array.from(donutsContainer);
    const indexOfDonutCart = donuts.findIndex(({ name }) => name === cartDonutName);

    const indexOfDonutFrontPage = donutsContainerArray.findIndex(
      (donut) => donut.childNodes[3].childNodes[1].innerHTML === cartDonutName
    );

    donuts[indexOfDonutCart].count = 0;
    donutsContainer[indexOfDonutFrontPage].childNodes[3].childNodes[7].childNodes[0].innerHTML = 0;

    deleteDonut.remove();

    updateFeesCart();
    updateCarts();
  }

  function cartPlusBtnFn(plusBtn) {
    plusBtn.addEventListener('click', clickPlusMinusCart);
  }

  function cartMinusBtnFn(minusBtn) {
    minusBtn.addEventListener('click', clickPlusMinusCart);
  }

  function cartDeleteBtnFn(deleteBtn) {
    deleteBtn.addEventListener('click', clickDeleteCart);
  }
  cartPlusBtns.forEach(cartPlusBtnFn);
  cartMinusBtns.forEach(cartMinusBtnFn);
  cartDeleteBtn.forEach(cartDeleteBtnFn);
}

function openCart() {
  cart[0].classList.toggle('hidden');

  backdropShadow.classList.remove('hidden');

  filterAll();
  createDonut();
  updateFeesCart();
  christmasCheck();
}

//when closing cart, remove all existing donuts in cart. Cart should be empty when closed. When open cart, create donuts and fees for the order
function defaultCart() {
  const cartDonuts = document.querySelectorAll('.cart-delete');
  cartDonuts.forEach((cartDonut) => {
    cartDonut.remove();
  });
}
function closeCart() {
  cart[0].classList.toggle('hidden');
  backdropShadow.classList.add('hidden');

  defaultCart();
}

function isbackDropShadow() {
  if (cart[0].classList.contains('hidden') === false) {
    defaultCart();
    cart[0].classList.add('hidden');
  }
  if (showForm[0].classList.contains('hidden') === false) {
    showForm[0].classList.add('hidden');
  }
  backdropShadow.classList.add('hidden');
}

function finalOrderSum() {
  showForm[0].classList.toggle('hidden');
  cart[0].classList.toggle('hidden');
  formSum[0].innerHTML = totalFee[0].innerHTML;
  if (Number(formSum[0].innerHTML) >= 800) {
    billOpt[0].setAttribute('disabled', '');
  }
}

//slideshow pictures
function switchImage(image) {
  const imageSrc = image.getAttribute('src');
  let checkEnd = imageSrc.substr(imageSrc.length - 8);
  checkEnd = checkEnd.slice(0, checkEnd.length - 4);
  if (checkEnd !== 'side') {
    image.setAttribute('src', `${imageSrc.slice(0, imageSrc.length - 4)}-side.svg`);
  } else {
    image.setAttribute('src', imageSrc.replace('-side', ''));
  }
}

function slideshowBtnRight(e) {
  const image = e.currentTarget.previousElementSibling;
  switchImage(image);
}

function slideshowBtnLeft(e) {
  const image = e.currentTarget.nextElementSibling;
  switchImage(image);
}

function slidershowLeftFn(btn) {
  btn.addEventListener('click', slideshowBtnLeft);
}

function slidershowRightFn(btn) {
  btn.addEventListener('click', slideshowBtnRight);
}

// -------------------------------------------------------------------------------------------------------
// Form---------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

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
    sendBtn.removeAttribute('disabled');
  } else {
    sendBtn.setAttribute('disabled', '');
  }
}

function closeForm() {
  showForm[0].classList.toggle('hidden');
  backdropShadow.classList.add('hidden');
}

function checkName() {
  if (firstNameField.value !== '' || firstNameField.value == null) {
    //if there's something written in the namefield it's valid
    validName = true;
    error1.classList.add('error-hidden');
  } else {
    validName = false;
    error1.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkLastName() {
  if (lastNameField.value !== '' || lastNameField.value == null) {
    validLastName = true;
    error2.classList.add('error-hidden');
  } else {
    validLastName = false;
    error2.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkAddress() {
  if (addressField.value.indexOf(' ') > -1) {
    validAddress = true;
    error3.classList.add('error-hidden');
  } else {
    validAddress = false;
    error3.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkPostNumber() {
  if (/^[0-9]{3}\s?[0-9]{2}$/.test(postNumberField.value)) {
    validPostNumber = true;
    error4.classList.add('error-hidden');
  } else {
    validPostNumber = false;
    error4.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkLocality() {
  if (localityField.value !== '' || localityField.value == null) {
    validLocality = true;
    error5.classList.add('error-hidden');
  } else {
    validLocality = false;
    error5.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkPhoneNumber() {
  if (/^07[\d]{1}-?[\d]{7}$/.test(phoneNumberField.value)) {
    validPhoneNumber = true;
    error6.classList.add('error-hidden');
  } else {
    validPhoneNumber = false;
    error6.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkEMail() {
  if (/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(eMailField.value)) {
    validEMail = true;
    error7.classList.add('error-hidden');
  } else {
    validEMail = false;
    error7.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkCardNumber() {
  if (cardNumberField.value !== null) {
    validCardNumber = true;
    error9.classList.add('error-hidden');
  } else {
    validCardNumber = false;
    error9.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkDate() {
  if (dateField.value !== null) {
    validDate = true;
    error10.classList.add('error-hidden');
  } else {
    validDate = false;
    error10.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkCvc() {
  if (cvcField.value !== null) {
    validCvc = true;
    error11.classList.add('error-hidden');
  } else {
    validCvc = false;
    error11.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkSocialNumber() {
  if (/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/.test(socialNumberField.value)) {
    validSocialNumber = true;
    error12.classList.add('error-hidden');
  } else {
    validSocialNumber = false;
    error12.classList.remove('error-hidden');
  }
  activateSendBtn();
}

function checkDiscount() {
  error13.style.visibility = 'visible';
  if (discountInput.value === 'a_damn_fine-cup_of-coffee') {
    error13.innerHTML = 'Giltig rabattkod';
    formSum[0].innerHTML = 0;
    billOpt[0].removeAttribute('disabled');
  }
}

function payByCard(e) {
  if (e.target.value === 'card') {
    hiddenInputs[0].style.display = 'block';
    hiddenInputs[1].style.display = 'block';
    hiddenInputs[2].style.display = 'block';
  } else {
    hiddenInputs[0].style.display = 'none';
    hiddenInputs[1].style.display = 'none';
    hiddenInputs[2].style.display = 'none';
  }
}

function payByBill(e) {
  if (e.target.value === 'bill') {
    hiddenInputs[3].style.display = 'block';
  } else {
    hiddenInputs[3].style.display = 'none';
  }
}

function skipCardFields(e) {
  if (e.target.value === 'bill') {
    validCardNumber = true;
    validCvc = true;
    validDate = true;
  } else {
    validCardNumber = false;
    validCvc = false;
    validDate = false;
  }
  activateSendBtn();
}

function skipBillFields(e) {
  if (e.target.value === 'card') {
    validSocialNumber = true;
  } else {
    validSocialNumber = false;
  }
  activateSendBtn();
}

//Shows the ordered donuts in the comfirmation
function confirmationDonuts() {
  for (let i = 0; i < 10; i += 1) {
    if (donuts[i].count > 0) {
      orderConfirm.innerHTML += ` 
      <p class="confirm-donuts">${donuts[i].name} ${donuts[i].count} st</p>
      <br>
      <img class="donut-img confirm-donuts" src="${donuts[i].img}" alt="Munk med socker" height="60" width="60" />`;
    }
  }
}

//Function that prevents page refreshing when clicking on the send button
function preventRefresh(e) {
  e.preventDefault();
}

//weekend = friday from 17 to sunday
function isWeekend() {
  const date = new Date();
  const getDay = date.getDay();
  const isFriday = getDay === 5;
  const isSaturday = getDay === 6;
  const isSunday = getDay === 0;
  const getTime = date.getTime();

  return (isFriday && getTime > 17) || isSaturday || isSunday;
}
// night = 00-06 o'clock
function isNight() {
  const date = new Date();
  const getTime = date.getTime();

  return getTime >= 0 && getTime < 6;
}

function isFriday11to13() {
  const date = new Date();
  const getTime = date.getTime();
  const isFriday = date.getDay() === 5;

  return isFriday && getTime > 11 && getTime < 13;
}

function changeDeliveryTime() {
  if (isWeekend()) {
    deliveryTime.innerHTML = '90 minuter';
  }
  if (isNight()) {
    deliveryTime.innerHTML = '45 minuter';
  }
  if (isFriday11to13()) {
    deliveryTime.innerHTML = 'Anländer klockan 15:00.';
  }
}
// shows how many donuts that has been orderd
function updateDeliveryCount() {
  deliveryCount.innerHTML = getDonutCount();
}

function sendOrder() {
  changeDeliveryTime();
  updateDeliveryCount();
  confirmationMessage.style.display = 'block';
  showForm[0].classList.toggle('hidden');
  confirmationDonuts();
}

function clearOrder() {
  resetForm.reset(); // reset form
  cartDeleteBtn.forEach((deleteBtn) => {
    deleteBtn.click();
  });
  defaultCart();
}

//Disables the Enter key in form, stops form from closing when using the Enter key
function preventEnterFromClosing(e) {
  const key = e.charCode || e.keyCode || 0;
  if (key === 13) {
    e.preventDefault();
  }
}

function closeConfirm() {
  document.location.reload();
}
function clearSite() {
  document.location.reload();
}

// -------------------------------------------------------------------------------------------------------
// Eventlistener------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

donutIncrease.forEach(increaseBtn);
donutDecrease.forEach(decreaseBtn);

sortNameBtnAsc.addEventListener('click', sortNameAsc);
sortNameBtnDesc.addEventListener('click', sortNameDesc);
sortPriceBtnAsc.addEventListener('click', sortPriceAsc);
sortPriceBtnDesc.addEventListener('click', sortPriceDesc);
sortRatingBtnAsc.addEventListener('click', sortRatingAsc);
sortRatingBtnDesc.addEventListener('click', sortRatingDesc);

filterBtnGlaze.addEventListener('click', filterGlaze);
filterBtnSprinkle.addEventListener('click', filterSprinkle);
filterBtnNone.addEventListener('click', filterNone);
filterBtnAll.addEventListener('click', filterAll);

inputLeft.addEventListener('input', setLeftValue);
inputRight.addEventListener('input', setRightValue);

openBtn[0].addEventListener('click', openCart);
closeBtn[0].addEventListener('click', closeCart);
clearBtn.addEventListener('click', clearOrder);

slideshowLeft.forEach(slidershowLeftFn);
slideshowRight.forEach(slidershowRightFn);
backdropShadow.addEventListener('click', isbackDropShadow);

orderBtn[0].addEventListener('click', finalOrderSum);
closeFormBtn.addEventListener('click', closeForm);

//form
firstNameField.addEventListener('change', checkName);
lastNameField.addEventListener('change', checkLastName);
addressField.addEventListener('change', checkAddress);
postNumberField.addEventListener('change', checkPostNumber);
localityField.addEventListener('change', checkLocality);
phoneNumberField.addEventListener('change', checkPhoneNumber);
eMailField.addEventListener('change', checkEMail);
cardNumberField.addEventListener('change', checkCardNumber);
dateField.addEventListener('change', checkDate);
cvcField.addEventListener('change', checkCvc);
discountCheckBtn[0].addEventListener('click', checkDiscount);
socialNumberField.addEventListener('change', checkSocialNumber);

methodOfPayment.addEventListener('change', payByCard);
methodOfPayment.addEventListener('change', payByBill);
methodOfPayment.addEventListener('change', skipCardFields);
methodOfPayment.addEventListener('change', skipBillFields);

sendBtn.addEventListener('click', sendOrder);
closeConfirmBtn.addEventListener('click', closeConfirm);

formContainer.addEventListener('submit', preventRefresh);
formContainer.addEventListener('keydown', preventEnterFromClosing);

setTimeout(clearSite, 1000 * 60 * 15);
