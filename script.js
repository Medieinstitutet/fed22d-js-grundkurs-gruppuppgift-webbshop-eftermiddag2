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
 * [X]Varukorgen ska vara dold som default
 * [X]Varukorgen ska kunna öppnas
 * []Det ska ligga en "beställ-knapp" i varukorgen
 * []När man trycker på beställ-knappen så ska formuläret öppnas
 * []Formuläret ska vara dolt som default
 * []Summeringen av beställningen ska visas i varukorgen
 *
 */

const openBtn = document.querySelectorAll('#openCart');
const closeBtn = document.querySelectorAll('#closeCart');

const cart = document.querySelectorAll('#shoppingCart');

openBtn[0].addEventListener('click', () => {
  cart[0].classList.toggle('hidden');
}); // If you click on "Varukorg" the shopping cart will open

closeBtn[0].addEventListener('click', () => {
  cart[0].classList.toggle('hidden');
}); // If you click on the button "Stäng" while the shopping cart is open it will close the shopping cart

const orderBtn = document.querySelectorAll('#order');
const showForm = document.querySelectorAll('#formContainer');

orderBtn[0].addEventListener('click', () => {
  showForm[0].classList.toggle('hidden');
  cart[0].classList.toggle('hidden');
}); // The form will only be visible if you click on "Beställ"

//filter price range
const inputLeft = document.getElementById('range-left');
const inputRight = document.getElementById('range-right');
const range = document.getElementById('range');
const priceFrom = document.querySelector('.price-from');
const priceTo = document.querySelector('.price-to');

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
  const minLeft = Number(inputLeft.min);
  const maxLeft = Number(inputLeft.max);
  //Math.min return smalles number of given values
  inputLeft.value = Math.min(
    // the limit of how the left knob can be. This case always 1 less than right knob
    Number(inputLeft.value),
    Number(inputRight.value) - 1
  );
  priceFrom.textContent = `${inputLeft.value}`; // change left value text
  const percent = ((inputLeft.value - minLeft) / (maxLeft - minLeft)) * 100; // calculating the % of the html-bar
  range.style.left = `${percent}%`; //moves the pink bar % from left

  filterPriceLeft();
};

const filterPriceRight = () => {
  donuts.forEach(({ price }, i) => {
    if (
      Number(inputRight.value) < Number(price) &&
      Number(inputLeft.value) < Number(price)
    ) {
      donutsContainer[i].style.display = 'none';
    }
    if (
      Number(inputRight.value) > Number(price) &&
      Number(inputLeft.value) < Number(price)
    ) {
      donutsContainer[i].style.display = 'flex';
    }
  });
};

const setRightValue = () => {
  const minRight = Number(inputRight.min);
  const maxRight = Number(inputRight.max);

  inputRight.value = Math.max(
    Number(inputRight.value),
    Number(inputLeft.value) + 1
  );
  priceTo.textContent = `${inputRight.value}`;
  const percent = ((inputRight.value - minRight) / (maxRight - minRight)) * 100;
  range.style.right = `${100 - percent}%`;

  filterPriceRight();
};

inputLeft.addEventListener('input', setLeftValue);
inputRight.addEventListener('input', setRightValue);

//discounts

// [] frakt: 25kr + 10% av totalbeloppet

// [] mån kl 3:00-10:00 => -10% på hela beställningssumman
// [] Display "Måndagsrabatt: 10 % på hela beställningen"

// [] Fre kl 15:00 - mån kl 03:00 => +15% på alla munkar (kund ska ej se detta)

// [] >800kr => ej faktura

// [] <= 10 samma sort munkar => -10% rabatt

// [] >15 munkar => fri frakt

// [] timer 15 min => rensa/tömma formulär
// [] meddela kund att denne är för långsam

// The form will only be visible if you click on "Beställ"

//Slideshow
//God has abandoned me

//variabler för knappar
const slideshowLeft = document.querySelectorAll('.btn-left');
const slideshowRight = document.querySelectorAll('.btn-right');

//Functioner för knapparna
const slideshowBtnRight = (e) => {
  const image = e.currentTarget.previousElementSibling; //Får sibling(bilden)
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
  }
};
const slideshowBtnLeft = (e) => {
  const image = e.currentTarget.nextElementSibling; //Samma sak som förra
  const imageSrc = image.getAttribute('src');
  image.setAttribute('src', imageSrc.replace('-side', '')); //Om den hittar -side, ta bort den
};
//Eventlisteners
slideshowLeft.forEach((btn) => {
  btn.addEventListener('click', slideshowBtnLeft);
});
slideshowRight.forEach((btn) => {
  btn.addEventListener('click', slideshowBtnRight);
});
//Potentiella ändringar: Göra så den loopar runt om man trycker mer, alt. göra knapparna greyed out efter ha tryckt på den.

//hej
