import { ttcGame } from './game-obj.js';

const {
  winCombos,
  startMessage,
  startGameMessage,
  undefinedPlayersMessage,
  xPlayerAlert,
  oPlayerAlert,
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

const controlsRef = document.querySelector('.controls');
const boxRef = document.querySelector('.field > .box');
const selectFormRef = document.querySelector('.select');
// const startBtnRef = document.querySelector('.btn--start');

// ===================RUNNING=====================

createControls(startMessage);

createBox();

// ===============EVENT LISTENERS=================

selectFormRef.addEventListener('submit', onStartBtnClick);
boxRef.addEventListener('click', onBoxClick);

// ==================FUNCTIONS====================

function createControls(entry) {
  controlsRef.innerHTML = `<button class="btn btn--restart" type="button">Restart</button>
<div class="screen"><span class="screen__text">${entry}</span></div>`;
  const restartBtn = document.querySelector('.btn--restart');
  restartBtn.addEventListener('click', onRestart);
  return (screenText = document.querySelector('.screen__text'));
}

function createBox() {
  for (let i = 1; i <= 9; i += 1) {
    boxMarkup += `<div class="item" data-id="${i}"></div>`;
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
    createControls(`Player X plays position ${cellPosition}`);
    turnsX.push(Number(cellPosition));
    let result = turnsX.length < 3 ? false : isWinner(winCombos, turnsX);
    if (result) {
      createControls(xPlayerAlert);
      setTimeout(() => {
        alert(xPlayerAlert);
        onRestart();
        return;
      }, 300);
    }

    player = 'O';

    if (playersNum === 'one') {
      const leftCells = cells.filter(cell => !turnsX.includes(cell) && !turnsO.includes(cell));
      maxCell = Math.max(...leftCells);
      minCell = Math.min(...leftCells);
      do {
        positionNumberO = Math.round(Math.random() * (maxCell - minCell) + minCell);
      } while (turnsX.includes(positionNumberO) || turnsO.includes(positionNumberO));

      setTimeout(() => {
        cellRef = document.querySelector(`.item[data-id="${positionNumberO}"]`);
        console.log('this is cellRef', cellRef);
        cellRef.style.backgroundColor = 'gold';
        cellRef.textContent = player;
        createControls(`Player O plays position ${positionNumberO}`);
        turnsO.push(positionNumberO);
        let result = turnsO.length < 3 ? false : isWinner(winCombos, turnsO);

        if (result) {
          createControls(oPlayerAlert);
          setTimeout(() => {
            alert(oPlayerAlert);
            onRestart();
            return;
          }, 300);
        }
      }, 500);
      setTimeout(() => {
        player = 'X';
        return;
      }, 500);
    }
  } else {
    if (playersNum === 'two') {
      cellRef.style.backgroundColor = 'gold';
      createControls(`Player O plays position ${cellPosition}`);
      turnsO.push(Number(cellPosition));
      let result = turnsO.length < 3 ? false : isWinner(winCombos, turnsO);
      if (result) {
        createControls(oPlayerAlert);
        setTimeout(() => {
          alert(oPlayerAlert);
          onRestart();
          return;
        }, 300);
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

  createControls(startMessage);
}
