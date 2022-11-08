const donutAmount = document.querySelectorAll('.donut-count');
const donutIncrease = document.querySelectorAll('.donut-amount-increase');
const donutDecrease = document.querySelectorAll('.donut-amount-reduce');
var donutCount = [];


//Puts all amounts of donuts to 0, and makes sure we have variables for every donut
donutAmount.forEach((element, index) => { //Loops through every class with ".donut-count"
    donutCount.push(0); //Adds a count to an array, defaults to 0
    element.innerHTML = donutCount[index] + " st"; //Sets the text to show it is 0 amount
});

//Button functionality
donutIncrease.forEach((button, index) =>{//Loops over all increase buttons
    button.addEventListener('click', () => {//Adds eventlistener for on click
        donutCount[index]++; //Adds +1 amount
        donutAmount[index].innerHTML = donutCount[index] + " st"; //Updates text
        console.log("Increased donut #" + index + " to " + donutCount[index]);
    });
});
donutDecrease.forEach((button, index) =>{//Loops over all decrease buttons
    button.addEventListener('click', () => {//Adds eventlistener for on click
        if(donutCount[index] > 0){//Checks so it isn't already 0
            donutCount[index]--; //Adds -1 amount
            donutAmount[index].innerHTML = donutCount[index] + " st"; //Updates text
            console.log("Decreased donut #" + index + " to " + donutCount[index]);
        } else {
            console.log("can't reduce below 0!");
        }
    });
});