import { axes } from './GameBoard';

function Display(size) {
  const { X_AXIS, Y_AXIS } = axes;

  function createGameBoard(isPlayer) {
    const container = document.createElement('div');
    container.className = 'board-container';
    const boardTitle = document.createElement('div');
    boardTitle.className = 'board-title';
    boardTitle.textContent = isPlayer ? 'You' : 'Computer';
    const board = document.createElement('div');
    board.classList.add('board');
    board.classList.add(isPlayer ? 'player' : 'computer');
    for (let i = 0; i < size ** 2; i += 1) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      board.appendChild(tile);
    }
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.appendChild(boardTitle);
    container.appendChild(board);
    document.querySelector('main').appendChild(container);
  }

  function createShipPlacingScreen() {
    const container = document.createElement('div');
    container.className = 'ship-placing-screen';
    const rotateBtn = document.createElement('button');
    rotateBtn.className = 'rotate';
    rotateBtn.textContent = 'Rotate';
    const board = document.createElement('div');
    board.className = 'board placing';
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size ** 2; i += 1) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      board.appendChild(tile);
    }
    container.appendChild(rotateBtn);
    container.appendChild(board);
    document.querySelector('main').appendChild(container);
  }

  function showShipPlacingScreen() {
    document.querySelector('.ship-placing-screen').classList.remove('hidden');
  }

  function hideShipPlacingScreen() {
    document.querySelector('.ship-placing-screen').classList.add('hidden');
  }

  function placeShip(pos, len, axis) {
    const board = document.querySelector('.board.placing');
    const tiles = Array.from(board.children);
    if (axis === X_AXIS) {
      for (let i = 0; i < len * size; i += size) {
        tiles[pos + i].classList.add('placed');
        tiles[pos + i].classList.remove('hover');
        tiles[pos + i].classList.remove('invalid');
      }
    }
    if (axis === Y_AXIS) {
      for (let i = 0; i < len; i += 1) {
        tiles[pos + i].classList.add('placed');
        tiles[pos + i].classList.remove('hover');
        tiles[pos + i].classList.remove('invalid');
      }
    }
  }

  function shipPlacementHovering(pos, len, axis, posValidity) {
    const board = document.querySelector('.board.placing');
    const tiles = Array.from(board.children);
    if (axis === X_AXIS) {
      for (let i = 0; i < len * size && pos + i < size ** 2; i += size) {
        tiles[pos + i].classList.add('hover');
        if (!posValidity) {
          tiles[pos + i].classList.add('invalid');
        }
      }
    }
    if (axis === Y_AXIS) {
      for (
        let i = 0;
        i < len && pos + i < Math.floor(pos / size + 1) * size;
        i += 1
      ) {
        tiles[pos + i].classList.add('hover');
        if (!posValidity) {
          tiles[pos + i].classList.add('invalid');
        }
      }
    }
  }

  function removeShipPlacementHovering(pos, len, axis) {
    const board = document.querySelector('.board.placing');
    const tiles = Array.from(board.children);
    if (axis === X_AXIS) {
      for (let i = 0; i < len * size && pos + i < size ** 2; i += size) {
        tiles[pos + i].classList.remove('hover');
        tiles[pos + i].classList.remove('invalid');
      }
    }
    if (axis === Y_AXIS) {
      for (
        let i = 0;
        i < len && pos + i < Math.floor(pos / size + 1) * size;
        i += 1
      ) {
        tiles[pos + i].classList.remove('hover');
        tiles[pos + i].classList.remove('invalid');
      }
    }
  }

  function spawnPlayerShips(computerBoard) {
    const board = document.querySelector('.board.computer');
    const tiles = Array.from(board.children);
    tiles.forEach((tile, index) => {
      if (computerBoard.getTile(index)) {
        tile.classList.add('placed');
      }
    });
  }

  function resetAllBoards() {
    const boards = document.querySelectorAll('.board');
    boards.forEach((board) => {
      const tiles = Array.from(board.children);
      tiles.forEach((tile) => {
        tile.className = 'tile';
      });
    });
  }

  function createResultScreen() {
    const container = document.createElement('div');
    container.className = 'result-screen hidden';
    const result = document.createElement('div');
    result.className = 'result';
    result.textContent = 'You won';
    const replayBtn = document.createElement('button');
    replayBtn.className = 'replay';
    replayBtn.textContent = 'Replay';
    container.appendChild(result);
    container.appendChild(replayBtn);
    document.querySelector('main').appendChild(container);
  }

  function showResultScreen(playerWon) {
    document.querySelector('.result').textContent = playerWon
      ? 'Congrats! You won'
      : 'Oops! You lost';
    document.querySelector('.result-screen').classList.remove('hidden');
  }

  function hideResultScreen() {
    document.querySelector('.result-screen').classList.add('hidden');
  }

  function updateComputerBoardTile(pos, hit) {
    const board = document.querySelector('.board.computer');
    const tile = board.children[pos];
    const tileClass = hit ? 'hit' : 'missed';
    tile.classList.add(tileClass);
  }

  function init() {
    createShipPlacingScreen();
    createResultScreen();
    createGameBoard(false);
    createGameBoard(true);
  }

  return {
    init,
    hideShipPlacingScreen,
    placeShip,
    shipPlacementHovering,
    removeShipPlacementHovering,
    spawnPlayerShips,
    resetAllBoards,
    showShipPlacingScreen,
    showResultScreen,
    hideResultScreen,
    updateComputerBoardTile,
  };
}

export default Display;
