// src/scripts/main.js

let firstPromise;
let resolveFirst;
let secondPromise;
let resolveSecond;
let thirdPromise;
let resolveThird;

window.addEventListener('DOMContentLoaded', () => {
  firstPromise = new Promise((resolve) => {
    resolveFirst = resolve;
    window.resolveFirst = resolveFirst; // teraz ESLint nie będzie narzekać
  });

  secondPromise = new Promise((resolve) => {
    resolveSecond = resolve;
    window.resolveSecond = resolveSecond;
  });

  thirdPromise = new Promise((resolve) => {
    resolveThird = resolve;
    window.resolveThird = resolveThird;
  });

  window.firstPromise = firstPromise;
  window.secondPromise = secondPromise;
  window.thirdPromise = thirdPromise;

  const leftButton = document.querySelector('#left-button');
  const rightButton = document.querySelector('#right-button');

  if (leftButton) {
    leftButton.addEventListener('click', () => {
      resolveSecond();
      resolveThird();
    });
  }

  if (rightButton) {
    rightButton.addEventListener('click', () => {
      resolveThird();
    });
  }
});
