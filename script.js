// connect the uhhh button from html to javascipt so i can click on the button
// Element Selectors 
var startGameBtn = document.querySelector("#start-game-button");
var timer = document.querySelector("#timer");
var startPageDiv = document.querySelector("#start-page");
var quizPageDiv = document.querySelector("#quiz-page");
var quizQuestion = document.querySelector("#quiz-question");
var quizAnswers= document.querySelectorAll(".quiz-answers");
var quizOutcome = document.querySelector("#quiz-outcome");
var endQuizPageDiv = document.querySelector("#end-quiz-page");

// Global Variables 
var timeLimit = 100;
var questionBank = [
    ["What is a string?", "0.4", "True", "1", "\"Hello\""],
    ["What is the purpose of CSS?", "Create mockups", "Web structure", "Functionality", "Styling"],
    ["How do you select a class in CSS?", "querySelector", "getElementById", "#class", ".class"]
];
var answeredQuestions = 0;
var points = 0;

function generateQuestion(questionSet, result) {
    // using javascript to generate quiz form without multiple
    // HTML sections   
    quizOutcome.textContent = result;
    quizQuestion.textContent = questionBank[questionSet][0];

    for (var i = 0; i < quizAnswers.length; i++) {
        quizAnswers[i].textContent = questionBank[questionSet][i + 1];
        quizAnswers[i].addEventListener("click", function() {
            console.log(this.textContent)
            if (this.textContent === questionBank[questionSet][4]) {
                result = "CORRECT";
                answeredQuestions += 1;
                points += 1;
                generateQuestion(questionSet + 1);
            } else {
                result = "WRONG";
                answeredQuestions++;
                timeLimit -= 5;
                generateQuestion(questionSet + 1);
            }

            if (answeredQuestions != questionBank.length) {
                generateQuestion(questionSet + 1, result);
            }
        });
    }
}

//Start Game function 
function startGame() {
    // start timer
    // hide the start page
    // show question
    answeredQuestions = 0;
    points = 0;

    startPageDiv.style.display = "none";

    quizPageDiv.style.display = "block";

    generateQuestion(0);

    var gameTimer = setInterval(function() {
        timeLimit -= 1;

        // check if time hits 0 end game
        if (timeLimit <= 0) {
            quizPageDiv.style.display = "none";
            endQuizPageDiv.style.display = "block";
            clearInterval(gameTimer);
        }

        // check if all question answered end game
        if (answeredQuestions === questionBank.length + 1) {
            quizPageDiv.style.display = "none";
            endQuizPageDiv.style.display = "block";
            clearInterval(gameTimer);
        }
        timer.textContent = timeLimit;
    }, 1000);
}


// click on start game button
startGameBtn.addEventListener("click", startGame);