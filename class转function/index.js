// 将下面的类转成function
// class _Example {
//   constructor(name) {
//     this.name = name;
//   }

//   func() {
//     console.log(this.name);
//   }
// }

"use strict";

function Example(name) {
  // 保证是通过new调用
  if (!new.target) {
    throw new TypeError(
      `class constructor Example cannot be invoked without 'new'`
    );
  }

  this.name = name;
}

Object.defineProperty(Example.prototype, "func", {
  value: function () {
    if (new.target) {
      throw new TypeError("不能用new来调用");
    }
    console.log(thi.name);
  },
  enumerable: false,
});
