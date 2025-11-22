'use strict';

const promise1 = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', clickHandler);
  }, 3000);
});
const promise2 = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
});
const promise3 = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;
  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
});

function showSuccess(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = message;
  document.body.appendChild(div);
}

function showError(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = message;
  document.body.appendChild(div);
}

promise1.then(showSuccess).catch((err) => showError(err.message));
promise2.then(showSuccess);
promise3.then(showSuccess);
