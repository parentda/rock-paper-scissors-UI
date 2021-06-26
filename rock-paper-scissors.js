const gameOptions = ["Rock", "Paper", "Scissors"];
let score;

let initialRounds = 0;
let roundCounter = 0;
let gameInProgress = false;

const startGameButton = document.querySelector("#startGame");
const playOptions = document.querySelectorAll(".playOptions > button");
const result = document.querySelector("#result");

function computerPlay() {
  const randomSelection = Math.floor(Math.random() * 3);
  return gameOptions[randomSelection];
}

function startGame(event) {
  score = [0, 0, 0];
  gameInProgress = true;
  console.log(event);
  const inputRounds = document.querySelector("#inputRounds");
  const trackRounds = document.querySelector("#trackRounds");
  playOptions.forEach((button) => button.removeAttribute("disabled"));
  initialRounds = inputRounds.value;
  roundCounter = inputRounds.value;
  trackRounds.textContent = roundCounter;
}

function playRound(event) {
  const computerSelection = computerPlay();
  const playerSelection = event.target.innerText;
  console.log(event);

  const indexDiff =
    gameOptions.indexOf(playerSelection) -
    gameOptions.indexOf(computerSelection);

  if (indexDiff === 0) {
    result.textContent = `It's a Tie!`;
    return 1;
  }
  if (indexDiff === 1 || indexDiff === -2) {
    result.textContent = `You Win! ${playerSelection} beats ${computerSelection}`;
    return 0;
  }
  result.textContent = `You Lose! ${computerSelection} beats ${playerSelection}`;
  return 2;
}

function showFinalScore() {
  if (score[0] === score[2]) {
    result.textContent = `After ${initialRounds} round(s), it's a tie!`;
  } else if (score[0] > score[2]) {
    result.textContent = `After ${initialRounds} round(s), you win ${score[0]}-${score[2]}!`;
  } else {
    result.textContent = `After ${initialRounds} round(s), you lose ${score[2]}-${score[0]}!`;
  }
}

function game() {
  const rounds = getRounds();
  if (rounds === null) {
    console.log(
      "You have cancelled the game. Please refresh the page to start a new game."
    );
    return false;
  }

  // Player's Win:Draw:Loss record

  for (let i = 0; i < rounds; i += 1) {
    const computerSelection = computerPlay();
    const playerSelection = userPlay();
    if (playerSelection === null) {
      console.log(
        "You have cancelled the game. Please refresh the page to start a new game."
      );
      return false;
    }
    score[playRound(playerSelection, computerSelection)] += 1;
  }

  showFinalScore(score, rounds);
  return true;
}

playOptions.forEach((button) => {
  button.addEventListener("click", playRound);
});

startGameButton.addEventListener("click", startGame);

// game();
