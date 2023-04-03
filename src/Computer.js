function Computer(size) {
  console.log(size);
  const hit = [];
  function attack() {
    const pos = Math.floor(Math.random() * (size ** 2));
    if (hit.findIndex((p) => p === pos) !== -1) {
      return attack();
    }
    hit.push(pos);
    return pos;
  }
  return { attack };
}

export default Computer;
