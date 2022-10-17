const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Hannover?',
        choice1: 'Saarland',
        choice2: 'Bayern',
        choice3: 'Niedersachsen',
        answer: 3,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Hamburg?',
        choice1: 'Saarland',
        choice2: 'Bayern',
        choice3: 'Hamburg',
        answer: 3,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Berlin?',
        choice1: 'Saarland',
        choice2: 'Berlin',
        choice3: 'Niedersachsen',
        answer: 2,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Stuttgart?',
        choice1: 'Baden-Württemberg',
        choice2: 'Rheinland-Pfalz',
        choice3: 'Niedersachsen',
        answer: 1,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt München?',
        choice1: 'Saarland',
        choice2: 'Bayern',
        choice3: 'Niedersachsen',
        answer: 2,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Potsdam?',
        choice1: 'Brandenburg',
        choice2: 'Bayern',
        choice3: 'Hamburg',
        answer: 1,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Bremen?',
        choice1: 'Saarland',
        choice2: 'Bremen',
        choice3: 'Niedersachsen',
        answer: 2,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Wiesbaden?',
        choice1: 'Saarland',
        choice2: 'Bayern',
        choice3: 'Hessen',
        answer: 3,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Schwerin?',
        choice1: 'Saarland',
        choice2: 'Bayern',
        choice3: 'Mecklenburg-Vorpommern',
        answer: 3,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Düsseldorf?',
        choice1: 'Nordrhein-Westfalen',
        choice2: 'Bayern',
        choice3: 'Niedersachsen',
        answer: 1,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Mainz?',
        choice1: 'Sachsen',
        choice2: 'Rheinland-Pfalz',
        choice3: 'Hamburg',
        answer: 2,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Saarbrücken?',
        choice1: 'Hamburg',
        choice2: 'Bayern',
        choice3: 'Saarland',
        answer: 3,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Magdeburg?',
        choice1: 'Saarland',
        choice2: 'Sachsen-Anhalt',
        choice3: 'Niedersachsen',
        answer: 2,
    },
    {
        question: 'Zu welchen Bundesland gehört die Hauptstadt Dresden?',
        choice1: 'Saarland',
        choice2: 'Bayern',
        choice3: 'Sachsen',
        answer: 3,
    },
    {
      question: 'Zu welchen Bundesland gehört die Hauptstadt Kiel?',
      choice1: 'Hamburg',
      choice2: 'Schleswig-Holstein',
      choice3: 'Thüringen',
      answer: 2,
  },
  {
    question: 'Zu welchen Bundesland gehört die Hauptstadt Erfurt?',
    choice1: 'Saarland',
    choice2: 'Bayern',
    choice3: 'Thüringen',
    answer: 3,
},
  ];

  //CONSTANTS
const CORRECT_BONUS = 2;
const MAX_QUESTIONS = 16;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/quiz/end.html");
  }
  questionCounter++;
  progressText.innerText = `Frage ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();