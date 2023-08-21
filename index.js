/*
Guess a user's number between 1 and 100
using binary search
*/

const numbers = () => {
  const array100 = [];
  for (let i = 1; i <= 100; i++) {
    array100.push(i);
  }
  return array100;
};
// Binary search
const getMiddleFromArray = (lowerPointer, upperPointer) => {
  return lowerPointer + Math.floor((upperPointer - lowerPointer) / 2);
};

//---------------------------HTML elements-------------------------
const gameDescription = document.querySelector("#game-description"); //first message
const startForm = document.forms["start-form"]; //form element
const optionsBtn = document.getElementById("options-btn"); //group of buttons
//buttons
const belowX = document.getElementById("below-number");
const numberToGuess = document.getElementById("got-number");
const overX = document.getElementById("over-number");
//initial values
const arrayNumbers = numbers(); //array of numbers
let lwPointer = 0; //lower pointer initially set to 0
let upPointer = arrayNumbers.length - 1; //upper pointer initially set to 99
let midIndex = getMiddleFromArray(lwPointer, upPointer); //middle index initially set to 49
//----------------------------------------------------------------
//when you click on Below button
belowX.onclick = () => {
  console.log(`button  ${belowX.innerHTML} clicked`);
  console.log(`L: ${lwPointer} mid: ${midIndex} H: ${upPointer}`);
  upPointer = midIndex - 1; //update uppper pointer
  midIndex = getMiddleFromArray(lwPointer, upPointer); //update middle index
  updateButtons(arrayNumbers[midIndex]); //update buttons' messages
};
//when you click on your number guessed botton
numberToGuess.onclick = () => {
  console.log(`button  ${numberToGuess.innerHTML} clicked`);
  console.log(`Your number's has been guessed`);
  //Start guessing again: putting initials values 
  putGameDescription();
  hideOptionsBtn();
  lwPointer = 0;
  upPointer = arrayNumbers.length - 1;
  midIndex = getMiddleFromArray(lwPointer, upPointer);
  startForm.style.display = "inline"; //showing start form button
};
//when you click on Over button
overX.onclick = () => {
  console.log(`button  ${overX.innerHTML} clicked`);
  console.log(`L: ${lwPointer} mid: ${midIndex} H: ${upPointer}`);
  lwPointer = midIndex + 1; //update lower pointer
  midIndex = getMiddleFromArray(lwPointer, upPointer); //update middle index
  updateButtons(arrayNumbers[midIndex]); //update buttons' messages
};
//Change buttons' messages
const updateButtons = (proposedNumber) => {
  belowX.innerHTML = `Below ${proposedNumber}`;
  numberToGuess.innerHTML = `${proposedNumber}`;
  overX.innerHTML = `Over ${proposedNumber}`;
};
//Initial message when you start playing
const putGameDescription = () => {
  gameDescription.innerHTML = `<p>Think about a number between 
  <b>${arrayNumbers[0]}</b> and <b>${
    arrayNumbers[arrayNumbers.length - 1]
  }</b>.</p>`;
};
putGameDescription();
const hideOptionsBtn = () => (optionsBtn.style.visibility = "hidden");
//this buttons are initially hidden when you start playing
hideOptionsBtn();

//after submit is pressed (start button) the game is started
startForm.addEventListener("submit", (event) => {
  event.preventDefault(); //prevent blinking
  optionsBtn.style.visibility = "visible"; //show buttons
  startForm.style.display = "none"; //deleting start form button
  //game mode, asking the user
  gameDescription.innerHTML = `<p>Is it?</p>`;
  //putting the options into the buttons:
  console.log(`L: ${lwPointer} mid: ${midIndex} H: ${upPointer}`);
  updateButtons(arrayNumbers[midIndex]);
});
