// connect the uhhh button from html to javascipt so i can click on the button
// Element Selectors 
var startGameBtn = document.querySelector("#start-game-button");
var timer = document.querySelector("#timer");
// Global Variables 
var timeLimit = 5;


//Start Game function 
function startGame() {
    // start timer
    // hide the start page
    // show question
    setInterval(function() {
        console.log("Hi");
        timeLimit -= 1;
        timer.textContent = timeLimit;
    }, 1000);
}


// click on start game button
startGameBtn.addEventListener("click", startGame);