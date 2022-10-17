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
        question: 'Wie heißt die Hauptstadt von Niedersachsen?',
        choice1: 'Hamburg',
        choice2: 'Hannover',
        choice3: 'Stuttgart',
        answer: 2,
    },
    {
        question: 'Wie heißt die Hauptstadt von Hamburg?',
        choice1: 'Hamburg',
        choice2: 'Düsseldorf',
        choice3: 'Bremen',
        answer: 1,
    },
    {
        question: 'Wie heißt die Hauptstadt von Baden-Württemberg?',
        choice1: 'Düsseldorf',
        choice2: 'Berlin',
        choice3: 'Stuttgart',
        answer: 3,
    },
    {
        question: 'Wie heißt die Hauptstadt von Berlin?',
        choice1: 'Berlin',
        choice2: 'München',
        choice3: 'Hannover',
        answer: 1,
    },
    {
        question: 'Wie heißt die Hauptstadt von Bayern?',
        choice1: 'Hannover',
        choice2: 'München',
        choice3: 'Stuttgart',
        answer: 2,
    },
    {
        question: 'Wie heißt die Hauptstadt von Hessen?',
        choice1: 'Hamburg',
        choice2: 'Wiesbaden',
        choice3: 'Hannover',
        answer: 2,
    },
    {
        question: 'Wie heißt die Hauptstadt von Mecklenburg-Vorpommern?',
        choice1: 'Stuttgart',
        choice2: 'Hamburg',
        choice3: 'Schwerin',
        answer: 3,
    },
    {
        question: 'Wie heißt die Hauptstadt von Nordrhein-Westfalen?',
        choice1: 'Düsseldorf',
        choice2: 'München',
        choice3: 'Hannover',
        answer: 1,
    },
    {
        question: 'Wie heißt die Hauptstadt von Rheinland-Pfalz?',
        choice1: 'Hamburg',
        choice2: 'Mainz',
        choice3: 'Düsseldorf',
        answer: 2,
    },
    {
        question: 'Wie heißt die Hauptstadt von Saarland?',
        choice1: 'Saarbrücken',
        choice2: 'München',
        choice3: 'Hamburg',
        answer: 1,
    },
    {
        question: 'Wie heißt die Hauptstadt von Sachsen-Anhalt?',
        choice1: 'Saarbrücken',
        choice2: 'München',
        choice3: 'Magdeburg',
        answer: 3,
    },
    {
        question: 'Wie heißt die Hauptstadt von Sachsen?',
        choice1: 'Saarbrücken',
        choice2: 'München',
        choice3: 'Dresden',
        answer: 3,
    },
    {
        question: 'Wie heißt die Hauptstadt von Schleswig-Holstein?',
        choice1: 'München',
        choice2: 'Hannover',
        choice3: 'Kiel',
        answer: 3,
    },
    {
        question: 'Wie heißt die Hauptstadt von Thüringen?',
        choice1: 'Erfurt',
        choice2: 'Wiesbaden',
        choice3: 'Hannover',
        answer: 1,
    },
    {
        question: 'Wie heißt die Hauptstadt von Bremen?',
        choice1: 'Erfurt',
        choice2: 'Bremen',
        choice3: 'Hannover',
        answer: 2,
    },
    {
        question: 'Wie heißt die Hauptstadt von Brandenburg?',
        choice1: 'Potsdam',
        choice2: 'Wiesbaden',
        choice3: 'Hamburg',
        answer: 1,
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
