// connect the uhhh button from html to javascipt so i can click on the button
// Element Selectors 
var startGameBtn = document.querySelector("#start-game-button");
var timer = document.querySelector("#timer");
var viewHighScores = document.querySelector("#view-high-scores");
var startPageDiv = document.querySelector("#start-page");
var quizPageDiv = document.querySelector("#quiz-page");
var quizQuestion = document.querySelector("#quiz-question");
var quizAnswers= document.querySelectorAll(".quiz-answers");
var quizOutcome = document.querySelector("#quiz-outcome");
var endQuizPageDiv = document.querySelector("#end-quiz-page");
var quizScoreDisplay = document.querySelector("#quiz-score");
var quizInitials = document.querySelector("#quiz-initials");
var quizScoreSubmitButton = document.querySelector("#quiz-score-submit");
var highScoresPageDiv = document.querySelector("#high-scores-page");
var clearScoresButton = document.querySelector("#clear-scores");
var returnHomeButton = document.querySelector("#home-button");
var highScoreDisplay = document.querySelector("#high-score");

// Global Variables 
var timeLimit = 100;
var questionBank = [
    ["What is a string?", "0.4", "True", "1", "\"Hello\""],
    ["What is the purpose of CSS?", "Create mockups", "Web structure", "Functionality", "Styling"],
    ["How do you select a class in CSS?", "querySelector", "getElementById", "#class", ".class"]
];
var answeredQuestions = 0;
var points = 0;

function showHighScores() {
    var name = localStorage.getItem("name-1");
    var score = localStorage.getItem("score-1");

    if (name != null) {
        highScoreDisplay.textContent = name + " - " + score;
    } else {
        highScoreDisplay.textContent = "";
    }

}
function showHighScorePage() {
    startPageDiv.style.display = "none";
    quizPageDiv.style.display = "none";
    endQuizPageDiv.style.display = "none";
    highScoresPageDiv.style.display = "block";

    showHighScores();

    clearScoresButton.addEventListener("click", function() {
        // clear local storage
        localStorage.clear();
        showHighScores();
    });

    returnHomeButton.addEventListener("click", function() {
        startPageDiv.style.display = "block";
        quizPageDiv.style.display = "none";
        highScoresPageDiv.style.display = "none";
    });
}

function endGame() {
    quizPageDiv.style.display = "none";
    endQuizPageDiv.style.display = "block";
    quizScoreDisplay.textContent = points;
    quizScoreSubmitButton.addEventListener("click", function() {
        localStorage.setItem("name-1", quizInitials.value);
        localStorage.setItem("score-1", points);
        showHighScorePage();
    });
}

function generateQuestion(questionSet, result) {
    // using javascript to generate quiz form without multiple
    // HTML sections   
    quizOutcome.textContent = result;
    quizQuestion.textContent = questionBank[questionSet][0];

    for (var i = 0; i < quizAnswers.length; i++) {
        quizAnswers[i].textContent = questionBank[questionSet][i + 1];
        quizAnswers[i].addEventListener("click", function setQuestions() {
            for (var j = 0; j < quizAnswers.length; j++) {
                quizAnswers[j].removeEventListener("click", setQuestions);
            }
            
            if (this.textContent === questionBank[questionSet][4]) {
                result = "CORRECT";
                answeredQuestions += 1;
                points += 1;
            } else {
                result = "WRONG";
                answeredQuestions += 1;
                timeLimit -= 5;
            }

            
            console.log("question set: " + questionSet);
            if (questionSet < questionBank.length - 1) {
                questionSet += 1;
                generateQuestion(questionSet, result);
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
            clearInterval(gameTimer);
            endGame();
        }

        // check if all question answered end game
        if (answeredQuestions === questionBank.length) {
            clearInterval(gameTimer);
            endGame();
        }

        timer.textContent = timeLimit;
    }, 1000);
}


// click on start game button
startGameBtn.addEventListener("click", startGame);
viewHighScores.addEventListener("click", showHighScorePage);