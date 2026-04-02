'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type;
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const handler = (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', handler);
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const leftHandler = (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', leftHandler);
      document.removeEventListener('contextmenu', rightHandler);
    }
  };

  const rightHandler = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('click', leftHandler);
    document.removeEventListener('contextmenu', rightHandler);
  };

  document.addEventListener('click', leftHandler);
  document.addEventListener('contextmenu', rightHandler);
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const leftHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkBoth();
    }
  };

  const rightHandler = (e) => {
    e.preventDefault();
    rightClicked = true;
    checkBoth();
  };

  function checkBoth() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', leftHandler);
      document.removeEventListener('contextmenu', rightHandler);
    }
  }

  document.addEventListener('click', leftHandler);
  document.addEventListener('contextmenu', rightHandler);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

secondPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

thirdPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));
