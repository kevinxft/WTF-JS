import { it, describe, expect, vi } from "vitest";
import MyPromise from "./promise";

function isPromiseLike(value) {
  if (!!value && (typeof value === "object" || typeof value === "function")) {
    return typeof value.then === "function";
  }
  return false;
}

describe("promise test", () => {
  it("Promise has then function", () => {
    const p = new MyPromise();
    expect(typeof p.then).toBe("function");
  });

  it("Promise then function should be success", async () => {
    const res = await new MyPromise((resolve) => {
      resolve(100);
    }).then((data) => {
      return data;
    });

    expect(res).equal(100);
  });

  it("Promise async resolve", async () => {
    const res = await new MyPromise((resolve) => {
      setTimeout(() => resolve(200), 0);
    }).then((data) => data);
    expect(res).equal(200);
  });

  it("Promise should has catch function", async () => {
    const fn = vi.fn();
    await new MyPromise((resolve, reject) => {
      throw Error("catch");
    }).catch((err) => fn(err));

    expect(fn).toBeCalled();
  });

  it("Promise should has finally function", async () => {
    const fn = vi.fn();

    await new MyPromise((resolve, reject) => {
      resolve();
    }).finally(() => fn());

    await new MyPromise((resolve, reject) => {
      throw Error("haha");
    })
      .catch(() => fn())
      .finally(() => fn());

    expect(fn).toBeCalledTimes(3);
  });

  it("Promise static reject function", async () => {
    expect(typeof MyPromise.reject).toBe("function");
    const res = MyPromise.reject();
    expect(isPromiseLike(res)).toBeTruthy();
  });

  it("Promise static resolve function", async () => {
    expect(typeof MyPromise.resolve).toBe("function");
    const res = MyPromise.resolve();
    expect(isPromiseLike(res)).toBeTruthy();
  });
});
