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
