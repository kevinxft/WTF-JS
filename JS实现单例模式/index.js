function isSameParams(arr1, arr2) {
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
        ins = Reflect.construct(target, args);
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
console.log(p2);
console.log(p1 === p2); // 同一个单例
