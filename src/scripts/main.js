'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  let isError = false;
  let hasFirst = true;

  const errorTimer = setTimeout(() => {
    reject(createDiv('First promise was rejected', 'error'));
    isError = true;
  }, 3000);

  body.addEventListener('click', () => {
    if (isError) {
      return;
    }

    clearTimeout(errorTimer);

    if (hasFirst) {
      resolve(createDiv('First promise was resolved', 'success'));
    }

    hasFirst = false;
  });
});

firstPromise.then(() => {}).catch(() => {});

const secondPromise = new Promise((resolve) => {
  let hasSecond = true;

  body.addEventListener('click', () => {
    if (hasSecond) {
      resolve(createDiv('Second promise was resolved', 'success'));
    }

    hasSecond = false;
  });

  body.addEventListener('contextmenu', () => {
    if (hasSecond) {
      resolve(createDiv('Second promise was resolved', 'success'));
      hasSecond = false;
    }
  });
});

secondPromise.then(() => {});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;
  let hasThirdLeft = true;
  let hasThirdRight = true;

  body.addEventListener('click', () => {
    leftClick = true;

    if (hasThirdLeft) {
      checkBothClicks();
    }

    hasThirdLeft = false;
  });

  body.addEventListener('contextmenu', () => {
    rightClick = true;

    if (hasThirdRight) {
      checkBothClicks();
    }

    hasThirdRight = false;
  });

  function checkBothClicks() {
    if (leftClick && rightClick) {
      resolve(createDiv('Third promise was resolved', 'success'));
    }
  }
});

thirdPromise.then(() => {});

function createDiv(message, className) {
  const newDiv = document.createElement('div');

  newDiv.className = className;
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.textContent = message;

  body.appendChild(newDiv);
}
