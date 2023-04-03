function Computer() {
  const hit = [];
  function attack(size) {
    let pos = 0;
    while (hit.findIndex(pos) !== -1) {
      pos = Math.floor(Math.random() * size ** 2);
    }
    return pos;
  }
  return { attack };
}

export default Computer;
