import Ship from './Ship';

function GameBoard(size) {
  const X_AXIS = 0;
  const Y_AXIS = 1;
  const UN_HIT = 0;
  const MISSED = 1;
  const HIT = 2;
  const tiles = Array(size ** 2).fill(null);
  const hit = Array(size ** 2).fill(UN_HIT);
  let numOfShips = 0;
  let shipsSunk = 0;

  function isTileEmpty(pos) {
    return tiles[pos] === null;
  }

  function getTile(pos) {
    return tiles[pos];
  }

  function shipPosValidity(pos, len, axis) {
    const row = Math.floor(pos / size);
    if (
      (axis === Y_AXIS && pos + len > (row + 1) * size) ||
      (axis === X_AXIS && pos + (len - 1) * size >= size ** 2)
    ) {
      return false;
    }

    return true;
  }

  function placeShip(pos, len, axis, ship) {
    if (!shipPosValidity(pos, len, axis)) {
      return false;
    }
    const newShip = ship || Ship(len);
    if (axis === Y_AXIS) {
      for (let i = pos; i < pos + len; i += 1) {
        tiles[i] = newShip;
      }
    } else {
      for (let i = 0; i < len; i += 1) {
        tiles[pos + i * size] = newShip;
      }
    }
    numOfShips += 1;
    return true;
  }

  function receiveAttack(pos) {
    if (hit[pos] !== UN_HIT) {
      return false;
    }
    if (getTile(pos)) {
      getTile(pos).hit();
      if (getTile(pos).isSunk()) {
        shipsSunk += 1;
      }
      hit[pos] = HIT;
    } else {
      hit[pos] = MISSED;
    }
    return true;
  }

  function reset() {
    tiles.fill(null);
    hit.fill(UN_HIT);
    numOfShips = 0;
    shipsSunk = 0;
  }

  function allShipsSunk() {
    return shipsSunk === numOfShips;
  }

  return {
    X_AXIS,
    Y_AXIS,
    HIT,
    MISSED,
    UN_HIT,
    size,
    hit,
    isTileEmpty,
    getTile,
    placeShip,
    receiveAttack,
    reset,
    allShipsSunk,
  };
}

export default GameBoard;
