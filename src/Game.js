import GameBoard from './GameBoard';
import Computer from './Computer';
import Display from './Display';
import { axes } from './GameBoard';

function Game() {
  const size = 6;
  const { X_AXIS, Y_AXIS } = axes;

  const computer = Computer(size);
  const playerGameBoard = GameBoard(size);
  const computerGameBoard = GameBoard(size);
  const display = Display(size);

  const shipsLength = [5, 4, 3, 3, 2];
  let currentShip = 0;
  let direction = X_AXIS;

  function placePlayerShips(e) {
    const target = e.target;
    const container = target.parentNode;
    if (
      !target.classList.contains('tile') ||
      !container.classList.contains('board') ||
      !container.classList.contains('placing')
    ) {
      return;
    }
    e.stopPropagation();
    const pos = Array.from(container.children).findIndex(
      (tile) => tile === target
    );
    if (
      !computerGameBoard.placeShip(pos, shipsLength[currentShip], direction)
    ) {
      return;
    }
    display.placeShip(pos, shipsLength[currentShip], direction);
    currentShip += 1;
    if (currentShip === shipsLength.length) {
      display.hideShipPlacingScreen();
      display.spawnPlayerShips(computerGameBoard);
    }
  }

  function spawnComputerShips() {
    shipsLength.forEach((len) => {
      while (true) {
        const { pos, axis } = computer.generateShipPos();
        if (playerGameBoard.shipPosValidity(pos, len, axis)) {
          playerGameBoard.placeShip(pos, len, axis);
          break;
        }
      }
    });
  }

  function playerAttack(e) {
    // Check if we hit a tile
    const target = e.target;
    const parent = target.parentNode;
    if (
      !target.classList.contains('tile') ||
      !parent.classList.contains('board') ||
      !parent.classList.contains('player')
    ) {
      return;
    }
    // Hit that tile
    const pos = Array.from(parent.children).findIndex(
      (child) => child === target
    );
    if (!playerGameBoard.receiveAttack(pos)) {
      return;
    }
    // Change that tile and the game state if it get hit the first time
    const tileState = playerGameBoard.hit[pos];
    const tileClass = tileState === playerGameBoard.HIT ? 'hit' : 'missed';
    target.classList.add(tileClass);
    if (playerGameBoard.allShipsSunk()) {
      display.showResultScreen(true);
      return;
    }
    // Computer's turn
    const computerPos = computer.attack();
    computerGameBoard.receiveAttack(computerPos);
    const hitRes = computerGameBoard.hit[computerPos];
    computer.receiveHitResult(hitRes === computerGameBoard.HIT);
    display.updateComputerBoardTile(computerPos, hitRes === computerGameBoard.HIT);
    if (computerGameBoard.allShipsSunk()) {
      display.showResultScreen(false);
    }
  }

  function reset() {
    computerGameBoard.reset();
    playerGameBoard.reset();
    computer.reset();
    currentShip = 0;
    direction = X_AXIS;
    display.resetAllBoards();
    spawnComputerShips();
    display.showShipPlacingScreen();
  }

  function setEventListeners() {
    window.addEventListener('click', playerAttack);
    window.addEventListener('click', placePlayerShips);
    document.querySelector('.replay').onclick = () => {
      reset();
      display.hideResultScreen();
    };
    document
      .querySelector('button.rotate')
      .addEventListener(
        'click',
        () => (direction = direction === X_AXIS ? Y_AXIS : X_AXIS)
      );
    const placeShipTiles = Array.from(
      document.querySelector('.board.placing').children
    );
    placeShipTiles.forEach((tile, pos) =>
      tile.addEventListener('mouseenter', () => {
        const posValidity = computerGameBoard.shipPosValidity(
          pos,
          shipsLength[currentShip],
          direction
        );
        display.shipPlacementHovering(
          pos,
          shipsLength[currentShip],
          direction,
          posValidity
        );
      })
    );
    placeShipTiles.forEach((tile, pos) =>
      tile.addEventListener('mouseleave', () => {
        display.removeShipPlacementHovering(
          pos,
          shipsLength[currentShip],
          direction
        );
      })
    );
  }

  function init() {
    display.init();
    setEventListeners();
    spawnComputerShips();
  }

  return { init };
}

export default Game;
