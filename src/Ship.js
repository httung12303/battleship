function Ship(len) {
  let unHit = len;
  function hit() {
    unHit -= 1;
  }
  function isSunk() {
    return unHit === 0;
  }
  return { len, hit, isSunk };
}

export default Ship;
