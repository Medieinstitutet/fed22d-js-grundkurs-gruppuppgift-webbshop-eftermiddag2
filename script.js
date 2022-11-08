const donutAmount = document.querySelectorAll(".donut-count")
const donutIncrease = document.querySelectorAll(".donut-amount-increase")
const donutDecrease = document.querySelectorAll(".donut-amount-reduce")
const donutCountCart = document.getElementById("donut-counter-cart")
var donutCount = []
let donuts = []

//Puts all amounts of donuts to 0, and makes sure we have variables for every donut
donutAmount.forEach((element, index) => {
  //Loops through every class with ".donut-count"
  donutCount.push(0) //Adds a count to an array, defaults to 0
  element.innerHTML = donutCount[index] + " st" //Sets the text to show it is 0 amount

  //Creates an object to store all info name, price and count
  donuts.push({
    name: document.getElementsByClassName("donut-name")[index].innerHTML,
    price: document
      .getElementsByClassName("donut-price")
      [index].innerHTML.replace("kr/st", ""),
    count: 0,
  })
})

//Button functionality
donutIncrease.forEach((button, index) => {
  //Loops over all increase buttons
  button.addEventListener("click", () => {
    //Adds eventlistener for on click
    donutCount[index]++ //Adds +1 amount
    donutAmount[index].innerHTML = donutCount[index] + " st" //Updates text

    //changing counts in object donuts
    donuts[index].count = document
      .getElementsByClassName("donut-count")
      [index].innerHTML.replace(" st", "")
    donutCountCart.innerHTML = getDonutCount().toString() + " kr" // Updates shopping cart count
    if (getDonutCount() > 0) {
      //If previously was hidden, and is now supposed to be visible, show
      donutCountCart.style.visibility = "visible"
    }
    console.log("Increased donut #" + index + " to " + donutCount[index])
  })
})

donutDecrease.forEach((button, index) => {
  //Loops over all decrease buttons
  button.addEventListener("click", () => {
    //Adds eventlistener for on click
    if (donutCount[index] > 0) {
      //Checks so it isn't already 0
      donutCount[index]-- //Adds -1 amount
      donutAmount[index].innerHTML = donutCount[index] + " st" //Updates text

      //changing counts in object donuts
      donuts[index].count = document
        .getElementsByClassName("donut-count")
        [index].innerHTML.replace(" st", "")

      donutCountCart.innerHTML = getDonutCount().toString() + " kr" //Updates shopping cart amount
      if (getDonutCount() <= 0) {
        //If 0, hide
        donutCountCart.style.visibility = "hidden"
      }
      console.log("Decreased donut #" + index + " to " + donutCount[index])
    } else {
      console.log("can't reduce below 0!")
    }
  })
})

//Gets the total amount of donuts
function getDonutCount() {
  let sum = donuts.reduce((acc, donut) => {
    return acc + donut.price * donut.count
  }, 0)
  return sum
}
