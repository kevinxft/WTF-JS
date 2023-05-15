const PENDING = "pending";
const REJECTED = "rejected";
const FULFILLED = "fulfilled";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };

    const reject = (err) => {
      this.#changeState(REJECTED, err);
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

  #changeState(state, data) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = data;
    this.#run();
  }

  #runMicroTask(func) {
    if (
      process !== null &&
      typeof process === "object" &&
      typeof process.nextTick === "function"
    ) {
      process.nextTick(func);
    } else if (typeof MutationObserver === "function") {
      const ob = new MutationObserver(func);
      const textNode = document.createTextNode("1");
      ob.observe(textNode);
      textNode.data = "2";
    } else {
      setTimeout(func, 0);
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }

      try {
        const data = callback(this.#result);
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const { resolve, reject, onFulFilled, onRejected } =
        this.#handlers.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFulFilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  then(onFulFilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        resolve,
        reject,
        onFulFilled,
        onRejected,
      });
      this.#run();
    });
  }
}

// test1
new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
}).then((data) => console.log(data));
