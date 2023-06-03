// ==UserScript==
// @name         掘金小册宽屏
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://juejin.cn/book/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=juejin.cn
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    let timer;
    const unsetWidth = () => {
      const ele = document.querySelector(".section-page");
      if (ele) {
        ele.style = "max-width: unset;";
        clearInterval(timer);
      }
    };
    timer = setInterval(unsetWidth, 500);
  });
})();
