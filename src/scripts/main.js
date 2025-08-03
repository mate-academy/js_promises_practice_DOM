'use strict';

let isSettled = false;
let isSettled2 = false;
let leftClicked = false;
let rightClicked = false;

function showMessage(message, type) {
  const div = document.createElement('div');

  div.classList.add('message', type);
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const handler = (ev) => {
    if (!isSettled) {
      if (ev.button === 0) {
        resolve('First promise was resolved');
        isSettled = true;
        document.removeEventListener('click', handler);
      }
    }
  };

  document.addEventListener('click', handler);

  setTimeout(() => {
    if (!isSettled) {
      reject(new Error('First promise was rejected'));
      isSettled = true;
      document.removeEventListener('click', handler);
    }
  }, 3000);
});

firstPromise.then((message) => {
  showMessage(message, 'success');
});

firstPromise.catch((error) => {
  showMessage(error.message || error.toString(), 'error');
});

const secondPromise = new Promise((resolve, reject) => {
  const handler = (ev) => {
    if (!isSettled2 && (ev.button === 0 || ev.button === 2)) {
      resolve('Second promise was resolved');
      isSettled2 = true;
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

secondPromise.then((message) => {
  showMessage(message, 'success');
});

const thirdPromise = new Promise((resolve, reject) => {
  const handler = (ev) => {
    if (ev.button === 0) {
      leftClicked = true;
    }

    if (ev.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

thirdPromise.then((message) => {
  showMessage(message, 'success');
});

document.addEventListener('contextmenu', (e) => e.preventDefault());
