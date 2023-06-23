Function.prototype._bind = function (ctx) {
  const args = Array.prototype.slice.call(arguments, 1);
  const fn = this;
  return function A() {
    const restArgs = Array.prototype.slice.call(arguments);
    const allArgs = args.concat(restArgs);
    // or this instanceof A
    if (Object.getPrototypeOf(this) === A.prototype) {
      // return fn.apply(ctx, allArgs)
      const obj = {};
      Object.setPrototypeOf(obj, fn.prototype);
      // or obj.prototype = fn.prototype;
      // or const obj = Object.create(fn.prototype);
      return fn.apply(obj, allArgs);
    } else {
      return fn.apply(ctx, allArgs);
    }
  };
};

function fn() {
  return Array.prototype.slice.call(arguments);
}

const newFn = fn._bind("ctx", 1, 2);
const result = new newFn(3, 4);
console.log(result);
const result2 = newFn(5, 6);
console.log(result2);
