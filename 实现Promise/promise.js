const PENDING = "pending";
const REJECTED = "rejected";
const FULFILLED = "fulfilled";

export default class MyPromise {
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
    } catch (error) {
      reject(error);
    }
  }

  #changeState(state, data) {
    if (this.#state === PENDING) {
      this.#state = state;
      this.#result = data;
      this.#run();
    }
  }

  then(onFulFilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulFilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
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

  #isPromiseLike(value) {
    if (!!value && (typeof value === "object" || typeof value === "function")) {
      return typeof value.then === "function";
    }
    return false;
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const sellted = this.#state === FULFILLED ? resolve : reject;
        sellted(this.#result);
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
      const { onFulFilled, onRejected, resolve, reject } =
        this.#handlers.shift();

      if (this.#state === FULFILLED) {
        this.#runOne(onFulFilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  finally(onFinally) {
    return this.then(
      (data) => {
        onFinally();
        return data;
      },
      (err) => {
        onFinally();
        throw err;
      }
    );
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    let _resolve, _reject;
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    if (p.#isPromiseLike(value)) {
      value.then(_resolve, _reject);
    } else {
      _resolve(value);
    }
    return p;
  }
}
