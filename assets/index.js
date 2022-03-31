//var to incorporate class and id to javascript
var screen0Ele = document.querySelector("#screen0");
var screen0ButtonEle = screen0Ele.querySelector("button");
var screen1Ele = document.querySelector("#screen1");
var screen1ButtonEle = screen1Ele.querySelector("button");
var screen2Ele = document.querySelector("#screen2");
var screen2ButtonEle = screen2Ele.querySelector("button");
var screen3Ele = document.querySelector("#screen3"); 
var screen3ButtonEle = document.querySelector("#button");
var timerEle = document.querySelector("#timer");
var topScoreEle = document.querySelector("#topScore");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#possibleAnswers");
var finalEle = document.querySelector("#finalScore");
var sendScoreEle = document.querySelector("#sendScore");
var playerInfoEle = document.querySelector("#playerInfo");
var highScoresEle = document.querySelector("highScoresEl");
var messageEl = document.querySelector("#message");
var timeLeft;
var timeInterval;

var HIDE_CLASS = "hide";

var questions = [
  {
    question: "What house was responsible for the mass murder of House Stark on the night known as the Red Wedding?",
    answers: ["House Lannister", "House Frey", "House Bolton", "House Greyjoy"],
    answer: 1
  },
  {
    question: "What is the name of Jon Snow's direwolf?",
    answers: ["GreyWolf", "Lady", "Nymeria", "Ghost"],
    answer: 3
  },
  {
    question: "Where can you find the Many-Faced God?",
    answers: ["Braavos", "Essos", "Meereen", "China"],
    answer: 0
  },
  {
    question: "What is the symbol for House Greyjoy?",
    answers: ["Direwolf", "Lion", "Kraken", "Rose"],
    answer: 2
  },
  {
    question: "What is the name of Daenarys favorite dragon?",
    answers: ["Drogon", "Viseryon", "Rhaegal", "Tyrion"],
    answer: 0
  },
  {
    question: "What is the famous quote from the believers of the Lord of Light?",
    answers: ["What is dead may never die", "Winter is Coming", "The night is dark and full of terror", "Fire and Blood"],
    answer: 2
  },
  {
    question: "Who becomes the Queen of the North at the end of the show?",
    answers: ["Arya", "Lady", "Sansa", "Brienne"],
    answer: 2
  },
  {
    question: "What is the name of the people Daenarys is sold to for marriage in the first season?",
    answers: ["Dothraki", "Ragnarok", "Mhysa", "Hogwarts"],
    answer: 0
  },
  {
    question: "Who's family resides over House Dorne?",
    answers: ["Stark", "Lannister", "Tyrell", "Martell"],
    answer: 3
  },
  {
    question: "Who is known for the famous quote,'I drink and I know things.'",
    answers: ["Tyrion", "Tywin", "Jon Snow", "Ned Stark"],
    answer: 0
  }

];
var currentQuestion = 0;

//how to alternate through question array with answer choices
var dynamicElements = [
  screen0Ele,
  screen1Ele,
  screen2Ele,
  screen3Ele,
  topScoreEle,
];

//how to begin game function
function init() {
  setEventListeners();
  bringupHighScores
}

//determines what functions to complete going through each screen 
function setState(state) {
  switch (state) {
    case 1:
      newGame();
      break;
    case 2:
        setFinalScore();
        break;
    case 3:
        bringupHighScores();
        break;
    default:
      break;
  }

//allows us to switch through screen id and remove hide class
  dynamicElements.forEach(function (ele) {
    var possibleStatesAttr = ele.getAttribute("data-index");
    var possibleStates = JSON.parse(possibleStatesAttr);
    if (possibleStates.includes(state)) {
      ele.classList.remove(HIDE_CLASS);
    } 
    else {
      ele.classList.add(HIDE_CLASS);
    }
  });
}

//first set function for someone playing for first time without high score
function newGame() {
    currentQuestion = 0;
    currentGame = new gamePurpose("", 0);
    provideQuestion(currentQuestion);
    countdown();
}

//provides the questions from array
function provideQuestion() {
  var questionObj = questions[currentQuestion];
  answersEl.innerHTML = "";
  questionEl.textContent = questionObj.question;
    for (i = 0; i < questionObj.answers.length; i++) {
        var answer = questionObj.answers[i];
        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        li.textContent = answer;
        answersEl.appendChild(li);
      }
    };
//fxn to go through answer and determine right or wrong
   function checkAnswer(currentQuestion, answerID) {
    if (answerID == questions[currentQuestion]["answer"]) {
      correct(true);
    } else {
      correct(false);
    }
  }
  
//   shows when answer if chosen, will display right or wrong in alert
  function correct(correct) {
    if (correct) {
      window.alert("Well done Westerosi!");
    } else {
      window.alert("Not even close!");
      timeLeft = timeLeft - 5;
    }
  }
  
  
//setup timer for quiz
function countdown() {
    timeLeft = 60;
    timerEle.textContent = timeLeft;
    timeInterval = setInterval(function () {
      
      if (timeLeft > 1) {
        timerEle.textContent = timeLeft + ' seconds remaining';
       timeLeft--;
      } else if (timeLeft === 1) {
        timerEle.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timerEle.textContent = '';
        clearInterval(timeInterval);
        setState(2);
      }
    
    }, 1000);
  }

  // Create var and functions to save scores to high score list
var HighScoreList = [];

function gamePurpose(name, score) {
    this.name = name;
    this.score = score;
}
//store results at end of game
function storeGame() {
    localStorage.setItem("highScoreList", JSON.stringify(HighScoreList));
}


  function setFinalScore() {
      finalEle.textContent = currentGame.score;
  }

  function getName(setFinalscore) {
    currentGame["name"] = playerInfoEle.ariaValueMax;
    HighScoreList.push(currentGame);
    storeGame();
  }

  function bringupHighScores() {
      HighScoreList = JSON.parse(localStorage.getItem("HighScoreList"));
      // highScoresEle.innerHTML = "";
      if (HighScoreList !== null) {
        HighScoreList = HighScoreList.sort((a,b) => b.score - a.score);
        HighScoreList.forEach(function (gamePurpose, index) {
          var a,b;
          a.innerHTML = gamePurpose.name;
          b.innerHTML = gamePurpose.score;
        });
    } else {
      setFinalScore("Your score sucks!");
      HighScoreList = [];
    }
  }
  

function setEventListeners() {
  screen0ButtonEle.addEventListener("click", function () {
    setState(1);
  });
  screen1ButtonEle.addEventListener("click", function () {
    setState(1);
  });
  screen2ButtonEle.addEventListener("click", function () {
    setState(3);
  });
  
  answersEl.addEventListener("click", function (evt) {
    var target = evt.target;
    if (target.matches("li")) {
        checkAnswer(currentQuestion, target.getAttribute("data-index"));
        if (currentQuestion === questions.length - 1) {
          clearInterval(timeInterval);
          setState(2);
        } 
        else {
        currentQuestion++;
        provideQuestion(currentQuestion);
    }
}
});

document.addEventListener("submit", function (event) {
    event.preventDefault;
    setInitials(currentGame.score);
    setState(3);
});
}

init();
  
