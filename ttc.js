// const boxEl = document.querySelector('.box');
// const resetBtnEl = document.querySelector('.btn-cross');

// let player = 'X';

// let markup = '';

// const winner = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
//   [1, 4, 7],
//   [2, 5, 8],
//   [3, 6, 9],
//   [1, 5, 9],
//   [3, 5, 7],
// ];

// for (let i = 1; i <= 9; i += 1) {
//   markup += `<div class="item" data-id="${i}"></div>`;
// }

// boxEl.insertAdjacentHTML('beforeend', markup);

// let playerX = [];
// let playerO = [];

// const onBoxElClick = e => {
//   console.log(e.target);
//   if (e.target.textContent) {
//     return;
//   }

//   e.target.textContent = player;

//   const position = e.target.dataset.id;
//   if (player === 'X') {
//     playerX.push(Number(position));
//     const finish = playerX.length < 3 ? false : isWinner(playerX);
//     setTimeout(() => {
//       if (finish) {
//         alert(`Player ${player} Wins`);
//         onResetBtnClick();
//         return;
//       }
//       player = 'O';
//     });
//   } else {
//     playerO.push(Number(position));
//     const finish = playerO.length < 3 ? false : isWinner(playerO);
//     setTimeout(() => {
//       if (finish) {
//         alert(`Player ${player} Wins`);
//         onResetBtnClick();
//         return;
//       }
//       player = 'X';
//     });
//   }
// };

// function isWinner(arr) {
//   return winner.some(el => el.every(item => arr.includes(item)));
// }

// function onResetBtnClick() {
//   boxEl.innerHTML = markup;
//   player = 'X';
//   playerX = [];
//   playerO = [];
// }

// boxEl.addEventListener('click', onBoxElClick);
// resetBtnEl.addEventListener('click', onResetBtnClick);

const controlsRef = document.querySelector('.controls');
const boxRef = document.querySelector('.field > .box');

const winCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let player = 'X';
let turnsX = [];
let turnsY = [];
let boxMarkup = '';

const createControls = entry => {
  controlsRef.innerHTML = `<button class="btn-cross" type="button">Restart</button>
<div class="screen"><span>${entry}</span></div>`;
  const restartBtn = document.querySelector('button.btn-cross');
  restartBtn.addEventListener('click', onRestart);
  return;
};

const createBox = () => {
  for (let i = 1; i <= 9; i += 1) {
    boxMarkup += `<div class="item" data-id="${i}"></div>`;
  }
  boxRef.insertAdjacentHTML('beforeend', boxMarkup);
  return boxMarkup;
};

createControls('New Game Player X Starts');
createBox();

const isWinner = (array, turns) =>
  array.some(combo => combo.every(number => turns.includes(number)));

function onRestart() {
  boxRef.innerHTML = boxMarkup;
  player = 'X';
  turnsX = [];
  turnsY = [];
  createControls('New Game Player X Starts');
}

const onBoxClick = e => {
  const cellRef = e.target;
  let cellPosition = cellRef.dataset.id;

  if (e.target.textContent) {
    return;
  }

  cellRef.textContent = player;

  if (player === 'X') {
    cellRef.style.backgroundColor = 'teal';
    createControls(`Player X plays position ${cellPosition}`);
    turnsX.push(Number(cellPosition));
    let result = turnsX.length < 3 ? false : isWinner(winCombos, turnsX);
    if (result) {
      createControls('Player X Wins!');
      setTimeout(() => {
        alert('Player X Wins!');
        onRestart();
        return;
      }, 300);
    }
    player = 'O';
  } else {
    cellRef.style.backgroundColor = 'gold';
    createControls(`Player O plays position ${cellPosition}`);
    turnsY.push(Number(cellPosition));
    let result = turnsY.length < 3 ? false : isWinner(winCombos, turnsY);
    if (result) {
      createControls('Player O Wins!');
      setTimeout(() => {
        alert('Player O Wins!');
        onRestart();
        return;
      }, 300);
    }
    player = 'X';
  }
};

boxRef.addEventListener('click', onBoxClick);
