
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
    question: "What is the name of Jon Snow's direwolf?",
    answers: ["GreyWolf", "Lady", "Nymeria", "Ghost"],
    answer: 3
  },
  {
    question: "What is the symbol for House Grejoy?",
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

var dynamicElements = [
  screen0Ele,
  screen1Ele,
  screen2Ele,
  topScoreEle,
];

var HighScoreList = [];

function gamePurpose(name, score) {
    this.name = name;
    this.score = score;
}

function storeGame() {
    localStorage.setItem("highScoreList", JSON.stringify(HighScoreList));
}

function init() {
  setEventListeners();
}

function newGame() {
    currentQuestion = 0;
    currentGame = new gamePurpose("", 0);
    populateQuestion(currentQuestion);
    countdown();
}

function populateHighScores () {
    HighScoreList=JSON.parse(localStorage.getItem("HighScoreList"));
}

function setState(state) {
  switch (state) {
    case 1:
      newGame();
      break;
    case 2:
        // setFinalScore();
        break;
    case 3:
        populateHighScores();
        break;
    default:
      break;
  }

  dynamicElements.forEach(function (ele) {
    var possibleStatesAttr = ele.getAttribute("data-states");
    var possibleStates = JSON.parse(possibleStatesAttr);
    if (possibleStates.includes(state)) {
      ele.classList.remove(HIDE_CLASS);
    } else {
      ele.classList.add(HIDE_CLASS);
    }
  });
}

function populateQuestion() {
  var questionObj = questions[currentQuestion];
  answersEl.innerHTML = "";
  questionEl.textContent = questionObj.question;

  questionObj.answers.forEach(function (question) {
    var li = document.createElement("li");
    li.textContent = question;
    answersEl.appendChild(li);
  });
  if (currentQuestion === questions.length - 1) {
    currentQuestion = 0;
  } else {
    currentQuestion++;
  }

}

function countdown() {
    timeLeft = 30;
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
      console.log(timeLeft)
    }, 1000);
  }
  


function setEventListeners() {
  screen0ButtonEle.addEventListener("click", function () {
    setState(1);
  });
  screen1ButtonEle.addEventListener("click", function () {
    setState(1);
  });
  screen2ButtonEle.addEventListener("click", function () {
    setState(1);
  });
  
  answersEl.addEventListener("click", function (evt) {
    var target = evt.target;
    if (target.matches("li")) {
    //   window.alert(target.innerText);
    populateQuestion();
    }
  });
}

init();

