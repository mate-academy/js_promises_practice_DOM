'use strict';

function showNotification(type, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;

  document.body.appendChild(div);
}

let leftClicked = false;
let rightClicked = false;

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) leftClicked = true;
  if (e.button === 2) rightClicked = true;
});

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);

  setTimeout(() => {
    reject('First promise was rejected');
    document.removeEventListener('mousedown', clickHandler);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

const thirdPromise = new Promise((resolve) => {
  const checkBoth = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', checkBoth);
    }
  };

  document.addEventListener('mousedown', checkBoth);
});

firstPromise
  .then(msg => showNotification('success', msg))
  .catch(msg => showNotification('error', msg));

secondPromise
  .then(msg => showNotification('success', msg));

thirdPromise
  .then(msg => showNotification('success', msg));
