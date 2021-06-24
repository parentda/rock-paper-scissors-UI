const gameOptions = ["Rock", "Paper", "Scissors"];

function computerPlay() {
  const randomSelection = Math.floor(Math.random() * 3);
  return gameOptions[randomSelection];
}

function userPlay() {
  let userInput;

  while (true) {
    userInput = prompt(
      `Please enter "${gameOptions[0]}", "${gameOptions[1]}", or "${gameOptions[2]}"`
    );

    if (userInput === null) {
      break;
    }

    userInput =
      userInput.charAt(0).toUpperCase() +
      userInput.trim().slice(1).toLowerCase();

    if (
      userInput === gameOptions[0] ||
      userInput === gameOptions[1] ||
      userInput === gameOptions[2]
    ) {
      break;
    }
  }

  return userInput;
}

function getRounds() {
  let numRounds;

  while (true) {
    numRounds = prompt(
      "How many rounds would you like to play? (Please enter an integer greater than 0)"
    );

    if (numRounds === null) {
      break;
    }

    numRounds = Number(numRounds);

    if (Number.isInteger(numRounds) && numRounds > 0) {
      break;
    }
  }

  return numRounds;
}

function playRound(playerSelection, computerSelection) {
  const indexDiff =
    gameOptions.indexOf(playerSelection) -
    gameOptions.indexOf(computerSelection);

  if (indexDiff === 0) {
    console.log(`It's a Tie!`);
    return 1;
  }
  if (indexDiff === 1 || indexDiff === -2) {
    console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
    return 0;
  }
  console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
  return 2;
}

function showFinalScore(score, rounds) {
  if (score[0] === score[2]) {
    console.log(`After ${rounds} round(s), it's a tie!`);
  } else if (score[0] > score[2]) {
    console.log(`After ${rounds} round(s), you win ${score[0]}-${score[2]}!`);
  } else {
    console.log(`After ${rounds} round(s), you lose ${score[2]}-${score[0]}!`);
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

game();
