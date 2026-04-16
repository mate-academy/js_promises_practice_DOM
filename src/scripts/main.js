'use strict';

function showNotification(message, type) {
  const note = document.createElement('div');

  note.setAttribute('data-qa', 'notification');
  note.classList.add(type);
  note.textContent = message;
  document.body.append(note);

  setTimeout(() => note.remove(), 5000);
}

const firstPromise = new Promise((resolve, reject) => {
  const handleFirst = (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleFirst);
      resolve('First promise was resolved');
    }
  };

  const timer = setTimeout(() => {
    document.removeEventListener('mousedown', handleFirst);

    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('mousedown', handleFirst);
});

const secondPromise = new Promise((resolve) => {
  const handleSecond = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handleSecond);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleSecond);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleThird = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handleThird);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleThird);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));

secondPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));

thirdPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err, 'error'));
