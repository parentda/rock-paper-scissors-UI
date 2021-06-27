const gameOptions = ["rock", "paper", "scissors"];
let score;

let roundCounter = 0;
let gameEndpoint = 0;

const startGameButton = document.querySelector("#startGame");
const playOptions = document.querySelectorAll(".playOptions button");
const trackRounds = document.querySelector("#trackRounds #roundsCount");
const scoreOptions = document.querySelectorAll("#trackScore [id]");
const result = document.querySelector("#result");
const finalScore = document.querySelector("#finalScore");

function computerPlay() {
  const randomSelection = Math.floor(Math.random() * 3);
  return gameOptions[randomSelection];
}

function startGame(event) {
  score = [0, 0, 0];
  roundCounter = 0;
  result.textContent = "";
  finalScore.textContent = "";
  // console.log(event);

  const inputRounds = document.querySelector("#inputRounds");

  playOptions.forEach((button) => button.removeAttribute("disabled"));
  scoreOptions.forEach((currentElement, currentIndex) => {
    currentElement.textContent = score[currentIndex];
  });
  // console.log(scoreOptions);

  gameEndpoint = inputRounds.value;

  trackRounds.textContent = roundCounter;
  startGameButton.textContent = "Restart Game";
}

function showFinalScore() {
  let roundVerbiage;
  if (roundCounter > 1) {
    roundVerbiage = "rounds";
  } else {
    roundVerbiage = "round";
  }

  if (score[0] === score[2]) {
    finalScore.textContent = `after ${roundCounter} ${roundVerbiage}, it's a tie!`;
  } else if (score[0] > score[2]) {
    finalScore.textContent = `after ${roundCounter} ${roundVerbiage}, you win the game ${score[0]}-${score[2]}!`;
  } else {
    finalScore.textContent = `after ${roundCounter} ${roundVerbiage}, you lose the game ${score[2]}-${score[0]}!`;
  }
}

function playRound(event) {
  const computerSelection = computerPlay();
  const playerSelection = event.target.id;
  console.log(event);

  const indexDiff =
    gameOptions.indexOf(playerSelection) -
    gameOptions.indexOf(computerSelection);

  if (indexDiff === 0) {
    score[1] += 1;
    result.textContent = `it's a tie!`;
    scoreOptions[1].textContent = score[1];
  } else if (indexDiff === 1 || indexDiff === -2) {
    score[0] += 1;
    result.textContent = `you win! ${playerSelection} beats ${computerSelection}`;
    scoreOptions[0].textContent = score[0];
  } else {
    score[2] += 1;
    result.textContent = `you lose! ${computerSelection} beats ${playerSelection}`;
    scoreOptions[2].textContent = score[2];
  }

  roundCounter += 1;
  trackRounds.textContent = roundCounter;

  if (score[0] >= gameEndpoint || score[2] >= gameEndpoint) {
    showFinalScore();
    playOptions.forEach((button) => button.setAttribute("disabled", "true"));
  }
}

playOptions.forEach((button) => {
  button.addEventListener("click", playRound);
});

startGameButton.addEventListener("click", startGame);
