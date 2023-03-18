// initializes lists and variables
var elementNames = getColumn("Periodic Table Elements", "Name");
var elementSymbol = getColumn("Periodic Table Elements", "Symbol");
var atomicNumber = getColumn("Periodic Table Elements", "Atomic Number");
var atomicWeight = getColumn("Periodic Table Elements", "Atomic Weight");
var correctAnswers = [];
var userAnswers = [];
var randInt = 0;
var currentQuestion = 0;
var score = 0;

// takes user to instructions screen
onEvent("beginButton", "click", function( ) {
  setScreen("instructionsScreen");
});

// starts game 
onEvent("goButton", "click", function( ) {
  score = 0;
  randInt = 0;
  currentQuestion = 0;
  setScreen("gameScreen");
  updateScreen();
  displayRandomQuestion();
});

// submits and checks user's answer
onEvent("sButton", "click", function( ) {
  setScreen("rightorwrongScreen");
  if (checkGuess(getText("answerGuess")) == "Correct") {
    setText("RorW", "Correct");
  } else {
    setText("RorW", "Incorrect");
  }
});

// takes user to next question
onEvent("nextButton", "click", function( ) {
  setScreen("gameScreen");
  updateScreen();
  displayRandomQuestion();
});

// goes back to home screen and resets game
onEvent("homeScreenbutton", "click", function( ) {
  elementNames = getColumn("Periodic Table Elements", "Name");
  elementSymbol = getColumn("Periodic Table Elements", "Symbol");
  atomicNumber = getColumn("Periodic Table Elements", "Atomic Number");
  atomicWeight = getColumn("Periodic Table Elements", "Atomic Weight");
  correctAnswers = [];
  userAnswers = [];
  setScreen("homeScreen");
});

// goes to answers screen
onEvent("viewAnswers", "click", function( ) {
  setScreen("answerScreen");
});
onEvent("backButton", "click", function( ) {
  setScreen("endScreen");
});

// displays a random question 
function displayRandomQuestion() {
  setText("eSymbol", elementSymbol[randInt]);
  r = randomNumber(1, elementNames.length);
  setText("aNumber", atomicNumber[randInt]);
  setText("aWeight", atomicWeight[randInt]);
}

// checks the user's guess
function checkGuess(guess) {
  var guessLower = guess.toLowerCase();
  var correctElementLower = elementNames[randInt].toLowerCase();
  removeItem(atomicWeight, randInt);
  removeItem(elementSymbol, randInt);
  removeItem(atomicNumber, randInt);
  removeItem(elementNames, randInt);
  appendItem(userAnswers, guessLower);
  appendItem(correctAnswers, correctElementLower);
  if (guessLower == correctElementLower) {
    score = score+1;
    return "Correct";
  } else {
    return "Incorrect";
  }
}

// updates screen after every question
function updateScreen() {
  currentQuestion = currentQuestion + 1;
  if (currentQuestion == 11) {
    setScreen("endScreen");
    endScreen();
  } else {
    setText("questionNumber", ("Question " + currentQuestion) + "/10");
    setText("answerGuess", "");
  }
}

// brings user to end screen after game
function endScreen() {
  setText("scoreOutput", "You got " + score + " out of 10 right!");
  if (score >= 5) {
    setText("endLabel", "Good Job!");
    setImageURL("endImage", "yayhappy.png");
  } else {
    setText("endLabel", "Oh No!");
    setImageURL("endImage", "kevinohno.png");
  }
  for (var i = 0; i < 10; i++) {
    if (userAnswers[i] == correctAnswers [i]) {
      setProperty("user" + i, "text-color", "green");
    } else {
      setProperty("user" + i, "text-color", "red");
    }
    setText("user" + i, userAnswers [i]);
    setText("correct" + i, correctAnswers [i]);
  }
}
//Image Credits
// 
//Periodic Table Image
//https://sciencenotes.org/printable-periodic-table/
// 
//Image of troubled Kevin McCalister from Home Alone
//https://deadline.com/2021/12/home-alone-house-airbnb-rental-1234883335/
//
//Image of Happy Sloth
//https://www.reddit.com/r/awwwtf/comments/1pgjxd/realllllyyyy_happy_sloth/
