import Ship from '../src/Ship';

describe('Ship test', () => {
  const ship = Ship(3);
  test('Length property', () => expect(ship.len).toBe(3));

  test('Ship is not sunk yet', () => expect(ship.isSunk()).toBe(false));

  test('Now it is', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
