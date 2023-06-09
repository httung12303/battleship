import GameBoard from '../src/GameBoard';
import Ship from '../src/Ship';
import {axes} from '../src/GameBoard';

const {X_AXIS, Y_AXIS} = axes;

describe('Test gameboard', () => {
  const gameboard = GameBoard(5);
  let mockShip = null;
  beforeEach(() => {
    gameboard.reset();
    mockShip = Ship(4);
  });
  test('Empty tiles should be empty', () => {
    expect(gameboard.isTileEmpty(0)).toBe(true);
    expect(gameboard.isTileEmpty(1)).toBe(true);
    expect(gameboard.isTileEmpty(2)).toBe(true);
  });
  test('Place ship horizontally', () => {
    gameboard.placeShip(1, mockShip.len, Y_AXIS, mockShip);
    for (let i = 1; i < 5; i += 1) {
      expect(gameboard.getTile(i)).toBe(mockShip);
      expect(gameboard.isTileEmpty(i)).toBe(false);
    }
  });
  test('Ship length goes beyond horizontal border', () => {
    gameboard.placeShip(3, mockShip.len, Y_AXIS, mockShip);
    expect(gameboard.getTile(3)).not.toBe(mockShip);
  });
  test('Place ship vertically', () => {
    gameboard.placeShip(0, mockShip.len, X_AXIS, mockShip);
    const pos = [0, 5, 10, 15];
    pos.forEach((p) => expect(gameboard.getTile(p)).toBe(mockShip));
  });
  test("Place ship where there's already one", () => {
    gameboard.placeShip(0, mockShip.len, X_AXIS, mockShip);
    const otherShip = Ship(1);
    const pos = [0, 5, 10, 15];
    pos.forEach((p) => {
      gameboard.placeShip(p, 1, X_AXIS, otherShip);
      expect(gameboard.getTile(p)).toBe(mockShip);
    });
  });
  test('Ship length goes beyond vertical border', () => {
    gameboard.placeShip(24, mockShip.len, X_AXIS, mockShip);
    expect(gameboard.getTile(24)).not.toBe(mockShip);
  });
  test('Hit ship once and does not sink', () => {
    gameboard.placeShip(1, mockShip.len, X_AXIS, mockShip);
    expect(mockShip.isSunk()).toBe(false);
  });
  test('Hit ship 4 times and it sinks', () => {
    gameboard.placeShip(1, mockShip.len, X_AXIS, mockShip);
    gameboard.receiveAttack(1);
    gameboard.receiveAttack(6);
    gameboard.receiveAttack(11);
    gameboard.receiveAttack(16);
    expect(mockShip.isSunk()).toBe(true);
  });
  test("Hit twice on the same tile and it doesn't sink", () => {
    gameboard.placeShip(1, mockShip.len, X_AXIS, mockShip);
    gameboard.receiveAttack(1);
    gameboard.receiveAttack(6);
    gameboard.receiveAttack(11);
    gameboard.receiveAttack(11);
    expect(mockShip.isSunk()).toBe(false);
  });
  test('Sink all ships', () => {
    const ships = [Ship(1), Ship(1), Ship(1)];
    ships.forEach((ship, index) => {
      gameboard.placeShip(index, ship.len, X_AXIS, ship);
      expect(gameboard.getTile(index)).toBe(ship);
      gameboard.receiveAttack(index);
    });
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
