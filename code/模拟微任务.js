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
