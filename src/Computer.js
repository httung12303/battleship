import { axes } from './GameBoard';

function Computer(size) {
  const { X_AXIS, Y_AXIS } = axes;
  const hit = [];
  let prevAttackHit = false;
  function attackValidityBasedOnPrevAttack(prev, dis) {
    if (hit.findIndex((pos) => pos === prev + dis) !== -1) {
      return false;
    }
    const row = Math.floor(prev / size);
    const column = prev % size;
    switch (dis) {
      case size:
        if (row === size - 1) {
          return false;
        }
        break;
      case -size:
        if (row === 0) {
          return false;
        }
        break;
      case 1:
        if (column === size - 1) {
          return false;
        }
        break;
      case -1:
        if (column === 0) {
          return false;
        }
        break;
      default:
        return false;
    }
    return true;
  }
  function attack() {
    if (prevAttackHit) {
      const prevAttack = hit[hit.length - 1];
      const distances = [-size, size, -1, 1];
      for (let i = 0; i < distances.length; i += 1) {
        const dis = distances[i];
        if (attackValidityBasedOnPrevAttack(prevAttack, dis)) {
          hit.push(prevAttack + dis);
          return prevAttack + dis;
        }
      }
    }
    let pos = Math.floor(Math.random() * size ** 2);
    while (hit.findIndex((p) => p === pos) !== -1) {
      pos = Math.floor(Math.random() * size ** 2);
    }
    hit.push(pos);
    return pos;
  }
  function generateShipPos() {
    const pos = Math.floor(Math.random() * size ** 2);
    const axis = Math.random() >= 0.5 ? X_AXIS : Y_AXIS;
    return { pos, axis };
  }
  function receiveHitResult(res) {
    prevAttackHit = res;
  }
  function reset() {
    hit.splice(0, hit.length);
    prevAttackHit = false;
  }
  return { attack, generateShipPos, receiveHitResult, reset };
}

export default Computer;
