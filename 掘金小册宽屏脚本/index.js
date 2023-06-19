// ==UserScript==
// @name         掘金小册宽屏
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://juejin.cn/book/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=juejin.cn
// @source       https://raw.githubusercontent.com/kevinxft/WTF-JS/main/%E6%8E%98%E9%87%91%E5%B0%8F%E5%86%8C%E5%AE%BD%E5%B1%8F%E8%84%9A%E6%9C%AC/index.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  let timer;
  const unsetWidth = () => {
    const ele = document.querySelector(".section-page");
    if (ele) {
      ele.style = "max-width: unset;";
      clearInterval(timer);
    }
  };
  function resetLayout() {
    timer = setInterval(unsetWidth, 500);
  }
  const _wr = function (type) {
    const orig = history[type];
    return function () {
      const rv = orig.apply(this, arguments);
      const e = new Event(type);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return rv;
    };
  };
  history.pushState = _wr("pushState");
  resetLayout();
  window.addEventListener("pushState", () => {
    resetLayout();
  });
})();
