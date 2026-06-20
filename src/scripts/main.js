'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const siteBody = document.querySelector('body');

  siteBody.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => showMessage(message, 'success'))
  .catch((err) => showMessage(err.message, 'error'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => showMessage(message, 'success'));

const thirdPromise = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  function checkBothClicks() {
    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    isLeftClicked = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isRightClicked = true;
    checkBothClicks();
  });
});

thirdPromise.then((message) => showMessage(message, 'success'));

function showMessage(text, className) {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.classList.add(className);
  newDiv.textContent = text;
  document.body.append(newDiv);
}
