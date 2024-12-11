'use strict';

// eslint-disable-next-line no-shadow
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;

  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
    isClicked = true;
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve(`second promise was resolved`);
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let [isLeftClicked, isRightClicked] = [false, false];

  // eslint-disable-next-line no-shadow
  document.addEventListener('mousedown', (event) => {
    switch (event.button) {
      case 0:
        isLeftClicked = true;
        break;
      case 2:
        isRightClicked = true;
        break;
      default:
        break;
    }

    if (isLeftClicked && isRightClicked) {
      resolve(`third promise was resolved`);
    }
  });
});

firstPromise.then((message) => message).catch((error) => error);
secondPromise.then((message) => message);
thirdPromise.then((message) => message);
