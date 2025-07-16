'use strict';

const addNotification = (message, type = 'success') => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('message', type === 'error' ? 'error' : 'success');
  div.textContent = message;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('mousedown', firstClickHandler);
  }, 3000);

  const firstClickHandler = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', firstClickHandler);
    }
  };

  document.addEventListener('mousedown', firstClickHandler);
});

firstPromise
  .then((msg) => addNotification(msg))
  .catch((err) => addNotification(err.message, 'error'));

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

secondPromise.then((msg) => addNotification(msg));

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const checkBothClicks = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', clickTracker);
    }
  };

  const clickTracker = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }
    checkBothClicks();
  };

  document.addEventListener('mousedown', clickTracker);
});

thirdPromise.then((msg) => addNotification(msg));
