let playerMoveValue = [];
let computerMoveValue = [];
let validity = true;
let gameStart = false;
let resetValue = true;
let startButton = true;
let reset

const easyDifficulty = document.querySelector('.js-easy-button');
const uniqueDifficulty = document.querySelector('.js-unique-button');
const insaneDifficulty = document.querySelector('.js-insane-button');
const titleDifficulty = document.querySelector('.js-difficulty-title');
const outlineDifficulty = document.querySelector('.js-difficulty-outline');
let easyValid = false; 
let uniqueValid = false;
let insaneValid = false;
let waitGameValid = true;
let defaultValid = true;
let insaneValue = 0;
let easyValue = 0;
let uniqueValue = 0;

let score = {
  easy: {
    wins: 0,
    losses: 0,
    ties: 0
  },
  unique: {
    wins: 0,
    losses: 0,
    ties: 0
  },
  insane: {
    wins: 0,
    losses: 0,
    ties: 0
  }
};

defaultDifficulty();

updateScore();

function defaultDifficulty() {
  easyValid = true;
  easyDifficulty.classList.add('easy-button-active');
  easyDifficulty.classList.remove('easy-button');
}

function difficultyChecker(difficulty) {
  if (difficulty === 1) {
    easyValid = true;
    uniqueValid = false;
    insaneValid = false;
    easyDifficulty.classList.add('easy-button-active');
    easyDifficulty.classList.remove('easy-button');
    uniqueDifficulty.classList.remove('unique-button-active');
    uniqueDifficulty.classList.add('unique-button');
    insaneDifficulty.classList.remove('insane-button-active');
    insaneDifficulty.classList.add('insane-button');
    updateScore();
    difficultyTitle();
  } else if (difficulty === 2) {
    easyValid = false;
    uniqueValid = true;
    insaneValid = false;
    easyDifficulty.classList.remove('easy-button-active');
    easyDifficulty.classList.add('easy-button');
    uniqueDifficulty.classList.add('unique-button-active');
    uniqueDifficulty.classList.remove('unique-button');
    insaneDifficulty.classList.remove('insane-button-active');
    insaneDifficulty.classList.add('insane-button');
    updateScore();
    difficultyTitle();
  } else if (difficulty === 3) {
    easyValid = false;
    uniqueValid = false;
    insaneValid = true;
    easyDifficulty.classList.remove('easy-button-active');
    easyDifficulty.classList.add('easy-button');
    uniqueDifficulty.classList.remove('unique-button-active');
    uniqueDifficulty.classList.add('unique-button');
    insaneDifficulty.classList.add('insane-button-active');
    insaneDifficulty.classList.remove('insane-button');
    updateScore();
    difficultyTitle();
  }
}

function difficultyTitle() {
  if (easyValid) {
    titleDifficulty.innerHTML = 'Easy';

    titleDifficulty.classList.add('difficulty-title-easy');
    titleDifficulty.classList.remove('difficulty-title-unique');
    titleDifficulty.classList.remove('difficulty-title-insane');

    outlineDifficulty.classList.add('difficulty-outline-easy');
    outlineDifficulty.classList.remove('difficulty-outline-unique');
    outlineDifficulty.classList.remove('difficulty-outline-insane');
  } else if (uniqueValid) {
    titleDifficulty.innerHTML = 'Unique';

    titleDifficulty.classList.add('difficulty-title-unique');
    titleDifficulty.classList.remove('difficulty-title-insane');
    titleDifficulty.classList.remove('difficulty-title-easy');

    outlineDifficulty.classList.add('difficulty-outline-unique');
    outlineDifficulty.classList.remove('difficulty-outline-easy');
    outlineDifficulty.classList.remove('difficulty-outline-insane');
  } else if (insaneValid) {
    titleDifficulty.innerHTML = 'Insane';

    titleDifficulty.classList.add('difficulty-title-insane');
    titleDifficulty.classList.remove('difficulty-title-unique');
    titleDifficulty.classList.remove('difficulty-title-easy');

    outlineDifficulty.classList.add('difficulty-outline-insane');
    outlineDifficulty.classList.remove('difficulty-outline-unique');
    outlineDifficulty.classList.remove('difficulty-outline-easy');
  }
}

function startGame(num) {
  if (gameStart) {
    waitGameValid = false;
    storePlayerMove(num);
    determineWinner();
    setTimeout(() => {
      waitGameValid = true;
      if (gameStart && validity) {
        storeComputerMove();
        determineWinner();
      }
    }, 500)
  }
}

function storePlayerMove(num) {
  if (!(computerMoveValue.includes(num))) {
    if (!(playerMoveValue.includes(num))) {
      validity = true;
      playerMoveValue.push(num);
      document.querySelector(`.js-tic-tac-toe-${num}`)
        .innerHTML = `<img class="move-icon" src="icons/cross-mark.svg">`;
      if (playerMoveValue.length === 5 && easyValid) {
        validity = false;
      }
    } else {
      validity = false;
    }
  } else {
    validity = false;
  }
}

function storeComputerMove() {
  let computerUniqueValueValid = false; 
  let computerValue = computerCalculateMove();
  let computerChance = Math.random();
  
  if (easyValid) {
    easyValue++;
    if (computerChance <= 0.5) {
      computerCounter(easyValue);
    } else {
      computerMoveValue.push(computerValue);
      document.querySelector(`.js-tic-tac-toe-${computerValue}`)
        .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
    }
  } else if (uniqueValid) {
    uniqueValue++;
    if (computerChance <= 0.5) {
      computerCounter(uniqueValue);
    } else {
      while (!computerUniqueValueValid) {
        let playerValueSwitch = Math.ceil(Math.random() * 9); 
        if (playerMoveValue.includes(playerValueSwitch)) {
          computerUniqueValueValid = true; 
          const indexArray = playerMoveValue.indexOf(playerValueSwitch); 
          if (indexArray > -1) {
            playerMoveValue.splice(indexArray, 1);
            playerMoveValue.push(computerValue);
            computerMoveValue.push(playerValueSwitch);
            document.querySelector(`.js-tic-tac-toe-${playerValueSwitch}`)
              .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
            document.querySelector(`.js-tic-tac-toe-${computerValue}`)
              .innerHTML = `<img class="move-icon" src="icons/cross-mark.svg">`;
          }
        }
      }
    }
  } else if (insaneValid) {
    insaneValue++; 
    computerAttack(insaneValue);
  }
}

function computerCounter(index) {
  if (index === 1) {
    combinationCounter();
  } else if (index === 2) {
    combinationCounter();
  } else if (index === 3) {
    combinationCounter();
  } else if (index === 4) {
    combinationCounter();
  }
}

function computerAttack(index) {
  if ((index === 1) && (playerMoveValue.includes(5))) {
    computerMoveValue.push(3); 
    document.querySelector(`.js-tic-tac-toe-3`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if ((index === 2) && (playerMoveValue.includes(9)) && (playerMoveValue.includes(5))) {
    computerMoveValue.push(1);
    document.querySelector(`.js-tic-tac-toe-1`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if ((index === 2) && (playerMoveValue.includes(1)) && (playerMoveValue.includes(5))) {
    computerMoveValue.push(9);
    document.querySelector(`.js-tic-tac-toe-9`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if ((index === 2) && (((playerMoveValue.includes(1)) && (playerMoveValue.includes(9))) || ((playerMoveValue.includes(3)) && (playerMoveValue.includes(7))))) {
    computerMoveValue.push(4);
    document.querySelector(`.js-tic-tac-toe-4`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (index === 1) {
    computerMoveValue.push(5); 
    document.querySelector(`.js-tic-tac-toe-5`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (index === 2) {
    combinationCounter();
  } else if (index === 3) {
    combinationCounter();
  } else if (index === 4) {
    combinationCounter();
  }
}

function computerCalculateMove() {
  let computerValid = false;
  while (!computerValid) {
    let computerValue = Math.ceil(Math.random() * 9);
    if ((!(playerMoveValue.includes(computerValue))) && (!(computerMoveValue.includes(computerValue)))) {
      computerValid = true;
      return computerValue;
    }
  }
}

function updateScore() {
  const playerDisplayWins = document.querySelector('.js-player-wins'); 
  const computerDisplayWins = document.querySelector('.js-computer-wins');

  if (easyValid) {
    const scoreWins = score.easy.wins; 
    const scoreLosses = score.easy.losses;
    const scoreTies = score.easy.ties;
    const winRatio = (Math.round(((scoreWins)/(scoreWins + scoreLosses + scoreTies)) * 100));

    if (isNaN(winRatio)) {
      document.querySelector('.js-ratio-easy')
        .innerHTML = `Win Ratio: 0%`;
    } else {
      document.querySelector('.js-ratio-easy')
        .innerHTML = `Win Ratio: ${winRatio}%`;
    }
    if (scoreWins < 10) {
      playerDisplayWins.innerHTML = `0${scoreWins}`;
    } else {
      playerDisplayWins.innerHTML = `${scoreWins}`;
    }
    if (scoreLosses < 10) {
      computerDisplayWins.innerHTML = `0${scoreLosses}`;
    } else {
      computerDisplayWins.innerHTML = `${scoreLosses}`;
    }
  } else if (uniqueValid) {
    const scoreWins = score.unique.wins; 
    const scoreLosses = score.unique.losses;
    const scoreTies = score.unique.ties;
    const winRatio = (Math.round(((scoreWins)/(scoreWins + scoreLosses + scoreTies)) * 100));

    if (isNaN(winRatio)) {
      document.querySelector('.js-ratio-unique')
        .innerHTML = `Win Ratio: 0%`;
    } else {
      document.querySelector('.js-ratio-unique')
        .innerHTML = `Win Ratio: ${winRatio}%`;
    }
    if (scoreWins < 10) {
      playerDisplayWins.innerHTML = `0${scoreWins}`;
    } else {
      playerDisplayWins.innerHTML = `${scoreWins}`;
    }
    if (scoreLosses < 10) {
      computerDisplayWins.innerHTML = `0${scoreLosses}`;
    } else {
      computerDisplayWins.innerHTML = `${scoreLosses}`;
    }
  } else if (insaneValid) {
    const scoreWins = score.insane.wins; 
    const scoreLosses = score.insane.losses;
    const scoreTies = score.insane.ties;
    const winRatio = (Math.round(((scoreWins)/(scoreWins + scoreLosses + scoreTies)) * 100));

    if (isNaN(winRatio)) {
      document.querySelector('.js-ratio-insane')
        .innerHTML = `Win Ratio: 0%`;
    } else {
      document.querySelector('.js-ratio-insane')
        .innerHTML = `Win Ratio: ${winRatio}%`;
    }
    if (scoreWins < 10) {
      playerDisplayWins.innerHTML = `0${scoreWins}`;
    } else {
      playerDisplayWins.innerHTML = `${scoreWins}`;
    }
    if (scoreLosses < 10) {
      computerDisplayWins.innerHTML = `0${scoreLosses}`;
    } else {
      computerDisplayWins.innerHTML = `${scoreLosses}`;
    }
  }
}

function combinationCounter() {
  if (((!playerMoveValue.includes(1)) && (computerMoveValue.includes(2)) && (computerMoveValue.includes(3)))) {
    computerMoveValue.push(1);
    document.querySelector(`.js-tic-tac-toe-1`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(2)) && (computerMoveValue.includes(1)) && (computerMoveValue.includes(3)))) {
    computerMoveValue.push(2);
    document.querySelector(`.js-tic-tac-toe-2`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(3)) && (computerMoveValue.includes(2)) && (computerMoveValue.includes(1)))) {
    computerMoveValue.push(3);
    document.querySelector(`.js-tic-tac-toe-3`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(4)) && (computerMoveValue.includes(5)) && (computerMoveValue.includes(6)))) {
    computerMoveValue.push(4);
    document.querySelector(`.js-tic-tac-toe-4`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(5)) && (computerMoveValue.includes(4)) && (computerMoveValue.includes(6)))) {
    computerMoveValue.push(5);
    document.querySelector(`.js-tic-tac-toe-5`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(6)) && (computerMoveValue.includes(4)) && (computerMoveValue.includes(5)))) {
    computerMoveValue.push(6);
    document.querySelector(`.js-tic-tac-toe-6`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(7)) && (computerMoveValue.includes(8)) && (computerMoveValue.includes(9)))) {
    computerMoveValue.push(7);
    document.querySelector(`.js-tic-tac-toe-7`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(8)) && (computerMoveValue.includes(7)) && (computerMoveValue.includes(9)))) {
    computerMoveValue.push(8);
    document.querySelector(`.js-tic-tac-toe-8`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(9)) && (computerMoveValue.includes(7)) && (computerMoveValue.includes(8)))) {
    computerMoveValue.push(9);
    document.querySelector(`.js-tic-tac-toe-9`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(1)) && (computerMoveValue.includes(4)) && (computerMoveValue.includes(7)))) {
    computerMoveValue.push(1);
    document.querySelector(`.js-tic-tac-toe-1`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(4)) && (computerMoveValue.includes(1)) && (computerMoveValue.includes(7)))) {
    computerMoveValue.push(4);
    document.querySelector(`.js-tic-tac-toe-4`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(7)) && (computerMoveValue.includes(1)) && (computerMoveValue.includes(4)))) {
    computerMoveValue.push(7);
    document.querySelector(`.js-tic-tac-toe-7`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(2)) && (computerMoveValue.includes(5)) && (computerMoveValue.includes(8)))) {
    computerMoveValue.push(2);
    document.querySelector(`.js-tic-tac-toe-2`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(5)) && (computerMoveValue.includes(2)) && (computerMoveValue.includes(8)))) {
    computerMoveValue.push(5);
    document.querySelector(`.js-tic-tac-toe-5`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(8)) && (computerMoveValue.includes(2)) && (computerMoveValue.includes(5)))) {
    computerMoveValue.push(8);
    document.querySelector(`.js-tic-tac-toe-8`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(3)) && (computerMoveValue.includes(6)) && (computerMoveValue.includes(9)))) {
    computerMoveValue.push(3);
    document.querySelector(`.js-tic-tac-toe-3`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(6)) && (computerMoveValue.includes(3)) && (computerMoveValue.includes(9)))){
    computerMoveValue.push(6);
    document.querySelector(`.js-tic-tac-toe-6`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(9)) && (computerMoveValue.includes(3)) && (computerMoveValue.includes(6)))) {
    computerMoveValue.push(9);
    document.querySelector(`.js-tic-tac-toe-9`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(1)) && (computerMoveValue.includes(5)) && (computerMoveValue.includes(9)))) {
    computerMoveValue.push(1);
    document.querySelector(`.js-tic-tac-toe-1`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(5)) && (computerMoveValue.includes(1)) && (computerMoveValue.includes(9)))) {
    computerMoveValue.push(5);
    document.querySelector(`.js-tic-tac-toe-5`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(9)) && (computerMoveValue.includes(1)) && (computerMoveValue.includes(5)))) {
    computerMoveValue.push(9);
    document.querySelector(`.js-tic-tac-toe-9`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(3)) && (computerMoveValue.includes(5)) && (computerMoveValue.includes(7)))) {
    computerMoveValue.push(3);
    document.querySelector(`.js-tic-tac-toe-3`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(5)) && (computerMoveValue.includes(3)) && (computerMoveValue.includes(7)))) {
    computerMoveValue.push(5);
    document.querySelector(`.js-tic-tac-toe-5`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!playerMoveValue.includes(7)) && (computerMoveValue.includes(3)) && (computerMoveValue.includes(5)))) {
    computerMoveValue.push(7);
    document.querySelector(`.js-tic-tac-toe-7`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  }  else if ((!computerMoveValue.includes(1)) && (playerMoveValue.includes(2)) && (playerMoveValue.includes(3))) {
    computerMoveValue.push(1);
    document.querySelector(`.js-tic-tac-toe-1`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(2)) && (playerMoveValue.includes(1)) && (playerMoveValue.includes(3)))) {
    computerMoveValue.push(2);
    document.querySelector(`.js-tic-tac-toe-2`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(3)) && (playerMoveValue.includes(2)) && (playerMoveValue.includes(1)))) {
    computerMoveValue.push(3);
    document.querySelector(`.js-tic-tac-toe-3`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(4)) && (playerMoveValue.includes(5)) && (playerMoveValue.includes(6)))) {
    computerMoveValue.push(4);
    document.querySelector(`.js-tic-tac-toe-4`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(5)) && (playerMoveValue.includes(4)) && (playerMoveValue.includes(6)))) {
    computerMoveValue.push(5);
    document.querySelector(`.js-tic-tac-toe-5`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(6)) && (playerMoveValue.includes(4)) && (playerMoveValue.includes(5)))) {
    computerMoveValue.push(6);
    document.querySelector(`.js-tic-tac-toe-6`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(7)) && (playerMoveValue.includes(8)) && (playerMoveValue.includes(9)))) {
    computerMoveValue.push(7);
    document.querySelector(`.js-tic-tac-toe-7`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(8)) && (playerMoveValue.includes(7)) && (playerMoveValue.includes(9)))) {
    computerMoveValue.push(8);
    document.querySelector(`.js-tic-tac-toe-8`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(9)) && (playerMoveValue.includes(7)) && (playerMoveValue.includes(8)))) {
    computerMoveValue.push(9);
    document.querySelector(`.js-tic-tac-toe-9`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(1)) && (playerMoveValue.includes(4)) && (playerMoveValue.includes(7)))) {
    computerMoveValue.push(1);
    document.querySelector(`.js-tic-tac-toe-1`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(4)) && (playerMoveValue.includes(1)) && (playerMoveValue.includes(7)))) {
    computerMoveValue.push(4);
    document.querySelector(`.js-tic-tac-toe-4`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(7)) && (playerMoveValue.includes(1)) && (playerMoveValue.includes(4)))) {
    computerMoveValue.push(7);
    document.querySelector(`.js-tic-tac-toe-7`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(2)) && (playerMoveValue.includes(5)) && (playerMoveValue.includes(8)))) {
    computerMoveValue.push(2);
    document.querySelector(`.js-tic-tac-toe-2`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(5)) && (playerMoveValue.includes(2)) && (playerMoveValue.includes(8)))) {
    computerMoveValue.push(5);
    document.querySelector(`.js-tic-tac-toe-5`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(8)) && (playerMoveValue.includes(2)) && (playerMoveValue.includes(5)))) {
    computerMoveValue.push(8);
    document.querySelector(`.js-tic-tac-toe-8`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(3)) && (playerMoveValue.includes(6)) && (playerMoveValue.includes(9)))) {
    computerMoveValue.push(3);
    document.querySelector(`.js-tic-tac-toe-3`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(6)) && (playerMoveValue.includes(3)) && (playerMoveValue.includes(9)))){
    computerMoveValue.push(6);
    document.querySelector(`.js-tic-tac-toe-6`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(9)) && (playerMoveValue.includes(3)) && (playerMoveValue.includes(6)))) {
    computerMoveValue.push(9);
    document.querySelector(`.js-tic-tac-toe-9`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(1)) && (playerMoveValue.includes(5)) && (playerMoveValue.includes(9)))) {
    computerMoveValue.push(1);
    document.querySelector(`.js-tic-tac-toe-1`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(5)) && (playerMoveValue.includes(1)) && (playerMoveValue.includes(9)))) {
    computerMoveValue.push(5);
    document.querySelector(`.js-tic-tac-toe-5`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(9)) && (playerMoveValue.includes(1)) && (playerMoveValue.includes(5)))) {
    computerMoveValue.push(9);
    document.querySelector(`.js-tic-tac-toe-9`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(3)) && (playerMoveValue.includes(5)) && (playerMoveValue.includes(7)))) {
    computerMoveValue.push(3);
    document.querySelector(`.js-tic-tac-toe-3`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(5)) && (playerMoveValue.includes(3)) && (playerMoveValue.includes(7)))) {
    computerMoveValue.push(5);
    document.querySelector(`.js-tic-tac-toe-5`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else if (((!computerMoveValue.includes(7)) && (playerMoveValue.includes(3)) && (playerMoveValue.includes(5)))) {
    computerMoveValue.push(7);
    document.querySelector(`.js-tic-tac-toe-7`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  } else {
    let computerValue = computerCalculateMove();
    computerMoveValue.push(computerValue);
    document.querySelector(`.js-tic-tac-toe-${computerValue}`)
      .innerHTML = `<img class="move-icon" src="icons/circle-mark.svg">`;
  }
}

function determineWinner() {
  if ((playerMoveValue.includes(1) && playerMoveValue.includes(2) && playerMoveValue.includes(3)) || (playerMoveValue.includes(4) &&
  playerMoveValue.includes(5) && playerMoveValue.includes(6)) || (playerMoveValue.includes(7) && playerMoveValue.includes(8) && 
  playerMoveValue.includes(9)) || (playerMoveValue.includes(1) && playerMoveValue.includes(4) && playerMoveValue.includes(7)) ||
  (playerMoveValue.includes(2) && playerMoveValue.includes(5) && playerMoveValue.includes(8)) || (playerMoveValue.includes(3) &&
  playerMoveValue.includes(6) && playerMoveValue.includes(9)) || (playerMoveValue.includes(1) && playerMoveValue.includes(5) &&
  playerMoveValue.includes(9)) || (playerMoveValue.includes(3) && playerMoveValue.includes(5) && playerMoveValue.includes(7))) {
    document.querySelector('.js-decision').innerHTML = `<div class="decision">Player Wins!</div>`;
    if (easyValid) {
      score.easy.wins ++;
      updateScore();
    } else if (uniqueValid) {
      score.unique.wins ++;
      updateScore();
    } else if (insaneValid) {
      score.insane.wins ++;
      updateScore();
    }
    gameStart = false; 
    resetValue = false;
  } else if ((computerMoveValue.includes(1) && computerMoveValue.includes(2) && computerMoveValue.includes(3)) || (computerMoveValue.includes(4) && 
  computerMoveValue.includes(5) && computerMoveValue.includes(6)) || (computerMoveValue.includes(7) && computerMoveValue.includes(8) && 
  computerMoveValue.includes(9)) || (computerMoveValue.includes(1) && computerMoveValue.includes(4) && computerMoveValue.includes(7)) ||
  (computerMoveValue.includes(2) && computerMoveValue.includes(5) && computerMoveValue.includes(8)) || (computerMoveValue.includes(3) &&
  computerMoveValue.includes(6) && computerMoveValue.includes(9)) || (computerMoveValue.includes(1) && computerMoveValue.includes(5) &&
  computerMoveValue.includes(9)) || (computerMoveValue.includes(3) && computerMoveValue.includes(5) && computerMoveValue.includes(7))) {
    document.querySelector('.js-decision').innerHTML = `<div class="decision">Computer Wins!</div>`;
    if (easyValid) {
      score.easy.losses ++;
      updateScore();
    } else if (uniqueValid) {
      score.unique.losses ++;
      updateScore();
    } else if (insaneValid) {
      score.insane.losses ++;
      updateScore();
    }
    gameStart = false;
    resetValue = false;
  } else if (playerMoveValue.length === 5) {
    document.querySelector('.js-decision').innerHTML = `<div class="decision">Tie!</div>`; 
    if (easyValid) {
      score.easy.ties ++;
      updateScore();
    } else if (uniqueValid) {
      score.unique.ties ++;
      updateScore();
    } else if (insaneValid) {
      score.insane.ties ++;
      updateScore();
    }
    gameStart = false;
    resetValue = false;
  }
}

easyDifficulty.addEventListener('click', () => {
  if (startButton) {
    difficultyChecker(1);
  }
});

uniqueDifficulty.addEventListener('click', () => {
  if (startButton) {
    difficultyChecker(2);
  }
});

insaneDifficulty.addEventListener('click', () => {
  if (startButton) {
    difficultyChecker(3);
  }
});

document.querySelector('.js-start-button')
  .addEventListener('click', () => {
    if (startButton) {
      const startElement = document.querySelector('.js-start-button');
      startElement.classList.add('start-inactive');
      startElement.classList.remove('start-button');
      for (let i = 1; i <= 9; i++) {
        const gameElement = document.querySelector(`.js-tic-tac-toe-${i}`);
        gameElement.classList.add('tic-tac-toe-button'); 
        document.querySelector(`.js-tic-tac-toe-${i}`).innerHTML = `${i}`; 
        if (i === 1) {
          gameElement.classList.add('button-style-4');
          gameElement.classList.add('button-style-1');
        } else if (i === 2) {
          gameElement.classList.add('button-style-4');
        } else if (i === 3) {
          gameElement.classList.add('button-style-4');
          gameElement.classList.add('button-style-2');
        } else if (i === 4) {
          gameElement.classList.add('button-style-1');
        } else if (i === 5) {
          gameElement.classList.add('button-style-5');
        } else if (i === 6) {
          gameElement.classList.add('button-style-2');
        } else if (i === 7) {
          gameElement.classList.add('button-style-3');
          gameElement.classList.add('button-style-1');
        } else if (i === 8) {
          gameElement.classList.add('button-style-3');
        } else if (i === 9) {
          gameElement.classList.add('button-style-3');
          gameElement.classList.add('button-style-2');
        }
      }
      startButton = false;
      if (resetValue) {
        gameStart = true;
      }
    }
  });

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    startButton = true;
    const startElement = document.querySelector('.js-start-button');
    startElement.classList.remove('start-inactive');
    startElement.classList.add('start-button');
    resetValue = true;
    playerMoveValue = [];
    computerMoveValue = [];
    insaneValue = 0;
    easyValue = 0;
    uniqueValue = 0;
    document.querySelector('.js-decision').innerHTML = ``;
    for (let i = 1; i <= 9; i++) {
      const gameElement = document.querySelector(`.js-tic-tac-toe-${i}`);
      gameElement.classList.remove('tic-tac-toe-button'); 
      if (i === 1 || i === 4 || i === 7) {
        document.querySelector(`.js-tic-tac-toe-${i}`).innerHTML = `T`; 
      } else if (i === 2) {
        document.querySelector(`.js-tic-tac-toe-${i}`).innerHTML = `I`;
      } else if (i === 3 || i === 6) {
        document.querySelector(`.js-tic-tac-toe-${i}`).innerHTML = `C`;
      } else if (i === 5) {
        document.querySelector(`.js-tic-tac-toe-${i}`).innerHTML = `A`;
      } else if (i === 8) {
        document.querySelector(`.js-tic-tac-toe-${i}`).innerHTML = `O`;
      } else if (i === 9) {
        document.querySelector(`.js-tic-tac-toe-${i}`).innerHTML = `E`;
      }

      if (i === 1) {
        gameElement.classList.remove('button-style-4');
        gameElement.classList.remove('button-style-1');
      } else if (i === 2) {
        gameElement.classList.remove('button-style-4');
      } else if (i === 3) {
        gameElement.classList.remove('button-style-4');
        gameElement.classList.remove('button-style-2');
      } else if (i === 4) {
        gameElement.classList.remove('button-style-1');
      } else if (i === 5) {
        gameElement.classList.remove('button-style-5');
      } else if (i === 6) {
        gameElement.classList.remove('button-style-2');
      } else if (i === 7) {
        gameElement.classList.remove('button-style-3');
        gameElement.classList.remove('button-style-1');
      } else if (i === 8) {
        gameElement.classList.remove('button-style-3');
      } else if (i === 9) {
        gameElement.classList.remove('button-style-3');
        gameElement.classList.remove('button-style-2');
      }
    }
  })

document.querySelector('.js-tic-tac-toe-1')
  .addEventListener('click', () => {
    if(waitGameValid) {
      startGame(1);
    }
  });
document.querySelector('.js-tic-tac-toe-2')
  .addEventListener('click', () => {
    if(waitGameValid) {
      startGame(2);
    }
  });
document.querySelector('.js-tic-tac-toe-3')
  .addEventListener('click', () => {
    if(waitGameValid) {
      startGame(3);
    }
  });
document.querySelector('.js-tic-tac-toe-4')
  .addEventListener('click', () => {
    if(waitGameValid) {
      startGame(4);
    }
  });
document.querySelector('.js-tic-tac-toe-5')
  .addEventListener('click', () => {
    if(waitGameValid) {
      startGame(5);
    }
  });
document.querySelector('.js-tic-tac-toe-6')
  .addEventListener('click', () => {
    if(waitGameValid) {
      startGame(6);
    }
  });
document.querySelector('.js-tic-tac-toe-7')
  .addEventListener('click', () => {
    if(waitGameValid) {
      startGame(7);
    }
  });
document.querySelector('.js-tic-tac-toe-8')
  .addEventListener('click', () => {
    if(waitGameValid) {
      startGame(8);
    }
  });
document.querySelector('.js-tic-tac-toe-9')
  .addEventListener('click', () => {
    if(waitGameValid) {
      startGame(9);
    }
  });