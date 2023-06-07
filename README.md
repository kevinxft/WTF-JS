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

## JS实现单例模式

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