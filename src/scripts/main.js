'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  let isError = false;
  let hasFirst = true;

  const errorTimer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    isError = true;
  }, 3000);

  body.addEventListener('click', () => {
    if (isError) {
      return;
    }

    clearTimeout(errorTimer);

    if (hasFirst) {
      resolve('First promise was resolved');
    }

    hasFirst = false;
  });
});

firstPromise
  .then(() => {
    createDiv('First promise was resolved', 'success');
  })
  .catch(() => {
    createDiv('First promise was rejected', 'error');
  });

const secondPromise = new Promise((resolve) => {
  let hasSecond = true;

  body.addEventListener('click', () => {
    if (hasSecond) {
      resolve('Second promise was resolved');
    }

    hasSecond = false;
  });

  body.addEventListener('contextmenu', () => {
    if (hasSecond) {
      resolve('Second promise was resolved');
      hasSecond = false;
    }
  });
});

secondPromise.then(() => {
  createDiv('Second promise was resolved', 'success');
});

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
      resolve('Third promise was resolved');
    }
  }
});

thirdPromise.then(() => {
  createDiv('Third promise was resolved', 'success');
});

function createDiv(message, className) {
  const newDiv = document.createElement('div');

  newDiv.className = className;
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.textContent = message;

  body.appendChild(newDiv);
}
