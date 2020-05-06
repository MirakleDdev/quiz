const question = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const options = Array.from(document.getElementsByClassName("options-text"));
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let quizOption1 = document.getElementById("option-1");
let quizOption2 = document.getElementById("option-2");
let quizOption3 = document.getElementById("option-3");
let quizOption4 = document.getElementById("option-4");

let questions = [
  {
    question:
      "Who founded Mimi Quiz Game?",
    option1: "Miracle",
    option2: "Mirabel",
    option3: "Mirade",
    option4: "Mimicle",
    answer: 1,
  },
  {
    question: `The default value of the "position" attribute is _________`,
    option1: "fixed",
    option2: "static",
    option3: "inherit",
    option4: "absolute",
    answer: 2,
  },
  {
    question: "What does CSS stand for?",
    option1: "Comp Style Sheets",
    option2: "Camp Soak Sheet",
    option3: "Cascading Style Sheet",
    option4: "Cee Es Es",
    answer: 3,
  },
  {
    question:
      "What CSS property controls the text size?",
    option1: "font-style",
    option2: "text-style",
    option3: "text-size",
    option4: "font-size",
    answer: 4,
  },
  {
    question:
      "What element makes a text bold?",
    option1: "<p>",
    option2: "<b>",
    option3: "<head>",
    option4: "<bold>",
    answer: 2,
  },
];

// Constants
const Correct_Point = 1;
const Max_Questions = 5;

startQuiz = () => {
  questionCounter = 0;
  sscore = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter} of ${Max_Questions}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  options.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      increaseScore(Correct_Point);
      selectedOption.parentElement.classList.add(classToApply);
    } else {
      selectedOption.parentElement.classList.add(classToApply);

      if (currentQuestion.answer === 1) {
        quizOption1.classList.add("correct");
      } else if (currentQuestion.answer === 2) {
        quizOption2.classList.add("correct");
      } else if (currentQuestion.answer === 3) {
        quizOption3.classList.add("correct");
      } else if (currentQuestion.answer === 4) {
        quizOption4.classList.add("correct");
      }
    }

    setTimeout(() => {
      quizOption1.classList.remove("correct");
      quizOption2.classList.remove("correct");
      quizOption3.classList.remove("correct");
      quizOption4.classList.remove("correct");
      selectedOption.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 650);
  });
});

nextButton.addEventListener("click", (event) => {
  getNewQuestion();
});

increaseScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();