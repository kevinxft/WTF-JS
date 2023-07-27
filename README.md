# WTF-JS
一些值得学的JS代码
[在线预览地址](https://kevinxft.github.io/WTF-JS/)

## Question 1
- 优先级
- Object.values的输出顺序
```js
const obj = {
  a: 0
}
obj['1'] = 0
obj[++obj.a] = obj.a++
const values = Object.values(obj)
obj[values[1]] = obj.a
console.log(obj)
```
<details>
  <summary>answer</summary>

  ```js
    { 1: 1, 2: 2, a: 2 } // 注意输出的顺序也有讲究
  ```
</details>

## Question 2（只出现一次的数字）
给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
> [leetcode题目地址](https://leetcode.cn/problems/single-number/)

<details>
  <summary>answer</summary>

  ```js
   var singleNumber = function(nums) {
    return nums.reduce((a, b) => a ^ b) 
    // 如果reduce的第二个参数没有填写，那么初始值就取数组的第一个数
  };
  ```
</details>

## Question 3 JS实现单例模式

<details>
  <summary>answer</summary>

  ```js
  function isSameParams(arr1, arr2) {
    // 这里还有很多问题
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  function singleton(className) {
    let ins;
    let params;
    return new Proxy(className, {
      construct(target, args) {
        if (!ins) {
          ins = Reflect.construct(className, args);
          // or ins = new className(...args);
          params = args;
        }
        if (!isSameParams(params, args)) {
          console.log(ins);
          throw Error("已经有一个实例");
        }
        return ins;
      },
    });
  }

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }

  const PersonSingleton = singleton(Person);
  const p1 = new PersonSingleton("张三", 18);
  const p2 = new PersonSingleton("张三", 18);
  console.log(p1 === p2); // 同一个单例

  ```
</details>


## Question 4 判断属性存不存在

<details>
  <summary>answer</summary>

  ```js
  function Obj() {
    this.a = undefined;
  }
  Obj.prototype.p = "prototype";

  const obj = new Obj();
  Object.defineProperty(obj, "e", {
    value: undefined,
    enumerable: false,
  });

  // 对比undefined
  // 弊端是如果属性值是undefined的话 例如Obj.a = unde
  console.log("属性undefined-->");
  console.log(obj.a !== undefined ? "存在" : "不存在");
  console.log(obj.p !== undefined ? "存在" : "不存在");

  // Object.keys(Obj)
  console.log("Object.keys，不可枚举的话就检测不到-->");
  console.log(Object.keys(obj).includes("a") ? "存在" : "不存在");
  console.log(Object.keys(obj).includes("p") ? "存在" : "不存在");
  console.log("[不可枚举]", Object.keys(obj).includes("e") ? "存在" : "不存在");

  // Object.hasOwnProperty
  console.log("Object.hasOwnProperty-->");
  console.log(obj.hasOwnProperty("a") ? "存在" : "不存在");
  console.log(obj.hasOwnProperty("p") ? "存在" : "不存在");

  // in
  console.log("in-->");
  console.log("a" in obj ? "存在" : "不存在");
  console.log("b" in obj ? "存在" : "不存在");
  ```
</details>

## Question 5 大整数相加函数

<details>
  <summary>answer</summary>

  ```js
  /**
 * 两个字符串数字相加
 * @param {string} a
 * @param {string} b
 */
function sum(a, b) {
  const len = Math.max(a.length, b.length);
  a = a.padStart(len);
  b = b.padStart(len);
  let carry = 0;
  let result = "";
  for (let i = len - 1; i >= 0; i--) {
    const sum = +a[i] + +b[i] + carry;
    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);
  }
  if (carry) {
    result = carry + result;
  }
  return result;
}

  ```
</details>


## Question 6 以同步的方式实现事件监听

<details>
  <summary>answer</summary>

  ```js
  (async () => {
    function getElement(cssSelector) {
      const dom = document.querySelector(cssSelector);
      const domProxy = new Proxy(dom, {
        get(target, key) {
          if (!key.startsWith("wait")) {
            return target[key];
          }
          const event = key.replace("wait", "").toLowerCase();
          return new Promise((resolve) => {
            target.addEventListener(event, resolve, {
              once: true,
            });
          });
        },
      });
      return domProxy;
    }
    const btn = getElement("button");
    while (true) {
      await btn.waitClick;
      console.log("click");
    }
})();


  ```
</details>

## Question 7 手写bind

<details>
  <summary>answer</summary>

  ```js
  Function.prototype._bind = function (ctx) {
    const args = Array.prototype.slice.call(arguments, 1);
    const fn = this;
    return function A() {
      const restArgs = Array.prototype.slice.call(arguments);
      const allArgs = args.concat(restArgs);
      // or if (this instanceof A)
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


  ```
</details>


## Question 8 手写call

<details>
  <summary>answer</summary>

  ```js
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


  ```
</details>

## Question 9 模拟微任务

<details>
  <summary>answer</summary>

  ```js
  function micorTask(fn) {
    if (typeof Promise === "function") {
      Promise.resolve().then(fn);
      return;
    }

    if (typeof MutationObserver === "function") {
      const ob = new MutationObserver(fn);
      const node = document.createTextNode("");
      ob.observe(node, {
        characterData: true,
      });
      node.data = "2";
      return;
    }

    if (process && typeof process.nextTick === "function") {
      Process.nextTick(fn);
      return;
    }

    if (typeof setImmediate === "function") {
      setImmediate(fn);
      return;
    }

    setTimeout(fn, 0);
  }


  ```
</details>

## Question 10 让下面结构成立
```js
let [a, b] = { a: 1, b: 2};
```
<details>
  <summary>answer</summary>

  ```js
  Object.prototype[Symbol.iterator] = function () {
    return Object.values(this)[Symbol.iterator]();
  };

  let [a, b] = {
    a: 1,
    b: 2,
  };

  console.log(a, b);

  ```
</details>