// 三个状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };

    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  #isPromiseLike(value) {
    if (value !== null && typeof value === "function") {
      return typeof value.then === "function";
    }
    return false;
  }

  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    // this.#run();
  }

  #runOne(callback, resolve, reject) {
    if (typeof callback !== "function") {
      const settled = this.#state === FULFILLED ? resolve : reject;
      settled(this.#result);
      return;
    }
    try {
      console.log(this.#result);
      console.log(data);
      const data = callback(this.#result);
      if (this.#isPromiseLike(data)) {
        data.then(resolve, reject);
      } else {
        resolve(data);
      }
    } catch (err) {
      reject(err);
    }
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }
}

// test 1
new MyPromise((resolve, reject) => {
  resolve(1);
}).then((data) => console.log(data));
