Function.prototype._call = function (ctx, ...args) {
  ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx);
  const key = Symbol("key");
  const fn = this;
  Object.defineProperty(ctx, key, {
    enumerable: false,
    value: fn,
  });
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

function test(...args) {
  console.log(this);
  console.log(args);
  return "result";
}

const res = test._call({ name: "kevin" }, 1, 2, 3);
console.log("res", res);
