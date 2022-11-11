import { ttcGame } from './game-obj.js';

const {
  winCombos,
  startMessage,
  startGameMessage,
  undefinedPlayersMessage,
  xPlayerAlert,
  oPlayerAlert,
  drawGameAlert,
} = ttcGame;

console.log('ttGame =', ttcGame);

// =============STARTING VARIABLES================

let screenText = '';
let playersNum = '';
let boxMarkup = '';
let player = 'X';
let cells = [];
let maxCell = 0;
let minCell = 0;
let turnsX = [];
let turnsO = [];
let positionNumberO = 0;
let cellRef = '';

// ==================SELECTORS====================

const heroRef = document.querySelector('.hero');
const controlsRef = document.querySelector('.controls');
const boxRef = document.querySelector('.field__box');

// const startBtnRef = document.querySelector('.btn--start');

// ===================RUNNING=====================

createScreen(startMessage);

createControls();

createBox();

// ===============EVENT LISTENERS=================

boxRef.addEventListener('click', onBoxClick);

// ==================FUNCTIONS====================

function createScreen(entry) {
  heroRef.innerHTML = `<h1 class="hero__heading">TIC-TAC-TOE</h1><div class="hero__screen"><span class="screen__text">${entry}</span></div>`;
  return (screenText = document.querySelector('.screen__text'));
}

function createControls() {
  controlsRef.innerHTML = `<form class="select"><ul class="select__field list"><li class="select__item"><label class="select__label"><input class="select__input visually-hidden" type="radio" name="players" value="one" checked /><span class="select__radio"></span> 1 player</label></li><li class="select__item"><label class="select__label"><input class="select__input visually-hidden" type="radio" name="players" value="two" /><span class="select__radio"></span>2 players</label></li></ul><button class="select__btn btn" type="submit">Start</button></form><button class="controls__btn btn btn--restart" type="button">Restart</button>`;
  const selectFormRef = document.querySelector('.select');
  selectFormRef.addEventListener('submit', onStartBtnClick);
  const restartBtn = document.querySelector('.btn--restart');
  restartBtn.addEventListener('click', onRestart);
}

function createBox() {
  for (let i = 1; i <= 9; i += 1) {
    boxMarkup += `<div class="field__cell" data-id="${i}"></div>`;
    cells.push(i);
  }
  console.log('cells =', cells);
  boxRef.insertAdjacentHTML('beforeend', boxMarkup);
  return boxMarkup;
}

function onStartBtnClick(evt) {
  evt.preventDefault();
  const selectFormElems = evt.currentTarget.elements;
  console.log(selectFormElems.players.value);
  screenText.textContent = startGameMessage;
  return (playersNum = selectFormElems.players.value);
}

function isWinner(array, turns) {
  return array.some(combo => combo.every(number => turns.includes(number)));
}

function onBoxClick(e) {
  if (playersNum === '') {
    screenText.textContent = undefinedPlayersMessage;
    setTimeout(() => {
      alert(undefinedPlayersMessage);
      onRestart();
    }, 300);
    return;
  }

  cellRef = e.target;
  let cellPosition = cellRef.dataset.id;

  if (cellRef.textContent) {
    return;
  }

  cellRef.textContent = player;

  if (player === 'X') {
    cellRef.style.backgroundColor = 'teal';
    createScreen(`Player X plays position ${cellPosition}`);
    turnsX.push(Number(cellPosition));
    let result = turnsX.length < 3 ? false : isWinner(winCombos, turnsX);
    if (result) {
      createScreen(xPlayerAlert);
      setTimeout(() => {
        alert(xPlayerAlert);
        onRestart();
      }, 300);
      return;
    }

    player = 'O';

    if (playersNum === 'one') {
      const leftCells = cells.filter(cell => !turnsX.includes(cell) && !turnsO.includes(cell));
      if (leftCells.length === 0) {
        createScreen(drawGameAlert);
        setTimeout(() => {
          alert(drawGameAlert);
          onRestart();
        }, 300);
        return;
      }
      maxCell = Math.max(...leftCells);
      minCell = Math.min(...leftCells);
      do {
        positionNumberO = Math.round(Math.random() * (maxCell - minCell) + minCell);
      } while (turnsX.includes(positionNumberO) || turnsO.includes(positionNumberO));
      cellRef = document.querySelector(`.field__cell[data-id="${positionNumberO}"]`);

      setTimeout(() => {
        console.log('this is cellRef', cellRef);
        cellRef.style.backgroundColor = 'gold';
        cellRef.textContent = player;
        createScreen(`Player O plays position ${positionNumberO}`);
        turnsO.push(positionNumberO);
        let result = turnsO.length < 3 ? false : isWinner(winCombos, turnsO);

        if (result) {
          createScreen(oPlayerAlert);
          setTimeout(() => {
            alert(oPlayerAlert);
            onRestart();
          }, 300);
          return;
        }
      }, 400);
      setTimeout(() => {
        player = 'X';
      }, 400);
      return;
    }
  } else {
    if (playersNum === 'two') {
      cellRef.style.backgroundColor = 'gold';
      createScreen(`Player O plays position ${cellPosition}`);
      turnsO.push(Number(cellPosition));
      let result = turnsO.length < 3 ? false : isWinner(winCombos, turnsO);
      if (result) {
        createScreen(oPlayerAlert);
        setTimeout(() => {
          alert(oPlayerAlert);
          onRestart();
        }, 300);
        return;
      }
      player = 'X';
    }
  }
}

function onRestart() {
  boxRef.innerHTML = boxMarkup;

  player = 'X';

  turnsX = [];
  turnsO = [];
  maxCell = 0;
  minCell = 0;
  playersNum = '';
  positionNumberO = 0;

  createScreen(startMessage);
}
