const gameOptions = ["Rock", "Paper", "Scissors"];
let numRounds = 0;

const startGameButton = document.querySelector("#startGame");
const playOptions = document.querySelectorAll(".playOptions > button");
const result = document.querySelector("#result");

function computerPlay() {
  const randomSelection = Math.floor(Math.random() * 3);
  return gameOptions[randomSelection];
}

function getRounds() {
  const inputRounds = document.querySelector("#inputRounds");
  const trackRounds = document.querySelector("#trackRounds");
  playOptions.forEach((button) => button.classList.toggle("hidden"));
  numRounds = inputRounds.value;
  trackRounds.textContent = numRounds;
}

function playRound(event) {
  const computerSelection = computerPlay();
  const playerSelection = event.target.innerText;

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

function showFinalScore(score, rounds) {
  if (score[0] === score[2]) {
    result.textContent = `After ${rounds} round(s), it's a tie!`;
  } else if (score[0] > score[2]) {
    result.textContent = `After ${rounds} round(s), you win ${score[0]}-${score[2]}!`;
  } else {
    result.textContent = `After ${rounds} round(s), you lose ${score[2]}-${score[0]}!`;
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
  const score = [0, 0, 0];

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

startGameButton.addEventListener("click", getRounds);

// game();
