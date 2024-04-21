// Selecting the timer element
const timeEl = document.querySelector(".timer");

// Initializing variables
let userScore = 0;
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval = null;
let userName = "";

// Array of quiz questions
let quizQuestions = [
  {
    question: "1. What is HTML an abbreviation for?",
    a: "Hyperworld Markup Language",
    b: "Hypertext Markup Language",
    c: "Hypertext Makeup Language",
    d: "Hypertext Markup Lesson",
    answer: "b",
  },
  {
    question: "2. What is CSS an abbreviation for?",
    a: "Cascading Style Sheets",
    b: "Cascading Server Sheets",
    c: "Counting Server Situation",
    d: "Corner Style Sheets",
    answer: "a",
  },
  {
    question: "3. What is JavaScript?",
    a: "Professional Server",
    b: "Profound Language",
    c: "Programming Service",
    d: "Programming Language",
    answer: "d",
  },
  {
    question: "4. What does JSON stand for?",
    a: "JavaScript Object Negative",
    b: "JavaScript Object Number",
    c: "JavaScript Object Notion",
    d: "JavaScript Object Narrative",
    answer: "c",
  },
  {
    question: "5. What does API stand for?",
    a: "Advanced Programming Interface",
    b: "Automated Programming Interface",
    c: "Application Programming Interface",
    d: "Association of Programming Integration",
    answer: "c",
  },
  {
    question: "6. What is GitHub primarily used for?",
    a: "Social media",
    b: "Video recording",
    c: "Streaming music",
    d: "Storing and sharing code",
    answer: "d",
  },
  {
    question: "7. Which is NOT a programming language?",
    a: "Python",
    b: "JavaScript",
    c: "API",
    d: "Java",
    answer: "c",
  },
  {
    question: "8. What is the main purpose of CSS?",
    a: "Style appearance of webpage",
    b: "Add interactivity to webpage",
    c: "Enhance accessibility of webpage",
    d: "Define webpage structure",
    answer: "a",
  },
  {
    question: "9. In JavaScript, which function prints to the console?",
    a: "console.log()",
    b: "print()",
    c: "log()",
    d: "display()",
    answer: "a",
  },
  {
    question: "10. What is the purpose of the 'for' loop in programming?",
    a: "Define a function",
    b: "Execute a block of code multiple times",
    c: "Make a decision between two or more options",
    d: "Store data temporarily",
    answer: "b",
  },
];

// Function to load a question onto the page
const loadQuestion = (question, questionNumber) => {
  $(".quiz-header").text("Question " + questionNumber);
  $(".question").text(question.question);
  $("#label-a").text(question.a);
  $("#label-b").text(question.b);
  $("#label-c").text(question.c);
  $("#label-d").text(question.d);
};

// Function to show a specific page of the quiz
const showPage = (className) => {
  $(".page").hide();
  $(className).show();
};

showPage(".one");

// Event listener for link to high score page
$(".btn-highscore").click(function () {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  showHighScores(highScores);
});

// Event listener for starting the quiz
$(".btn-start").click(function () {
  showPage(".two");
  userScore = 0;
  setTime();
  currentQuestionIndex = 0;
  loadQuestion(quizQuestions[currentQuestionIndex], currentQuestionIndex + 1);
});

// Event listener for submitting an answer
$(".btn-submit").click(function () {
  var selected = $("input[type='radio']:checked").val();
  console.log(selected);
  if (selected !== quizQuestions[currentQuestionIndex].answer) {
    timeLeft -= 10;
  } else {
    userScore += 10;
    $(".points").text("Score: " + userScore);
  }

  if (currentQuestionIndex === 9) {
    endQuiz();
    return;
  }
  currentQuestionIndex++;
  loadQuestion(quizQuestions[currentQuestionIndex], currentQuestionIndex + 1);
});

// Function to end the quiz
const endQuiz = () => {
  showPage(".three");
  clearInterval(timerInterval);
  timeLeft = 60;
  $(".final-score").text(userScore);
};

// Function to set the timer
const setTime = () => {
  timerInterval = setInterval(function () {
    timeLeft--;
    console.log("seconds left");
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
};

// Event listener for submitting the user's score
$(".btn-score").click(function () {
  userName = $("input[type='text']").val();
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ name: userName, score: userScore });
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  showHighScores(highScores);
  userScore = 0;
});

// Function to display high scores
const showHighScores = (scores) => {
  showPage(".four");
  let winnerText = "";
  scores.forEach((score, index) => {
    winnerText += `${index + 1}. ${score.name}: ${score.score}<br>`;
  });
  $(".winner").html(winnerText);
};

// Event listener for clearing high scores
$(".btn-clear").click(function () {
  localStorage.removeItem("highScores");
  $(".winner").empty();
});

// Event listener for restarting the quiz
$(".btn-restart").click(function () {
  showPage(".one");
  $(".quiz-header").text("Quiz Game: Code Edition");
  userScore = 0;
  $("input[type='text']").val("");
});
