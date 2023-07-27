Object.prototype[Symbol.iterator] = function () {
  return Object.values(this)[Symbol.iterator]();
};

let [a, b] = {
  a: 1,
  b: 2,
};

console.log(a, b);
