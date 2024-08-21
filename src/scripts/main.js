'use strict';

function showMessage(message, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  if (isError) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }

  div.textContent = message;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((response) => showMessage(response))
  .catch((error) => showMessage(error, true));

const secondPromise = new Promise((resolve, reject) => {
  const runRes = () => resolve('Second promise was resolved');

  document.addEventListener('click', runRes);
  document.addEventListener('contextmenu', runRes);
});

secondPromise.then((response) => showMessage(response));

const thirdPromise = new Promise((resolve, reject) => {
  let l = 0;
  let r = 0;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      l = 1;
    }

    if (e.button === 2) {
      r = 1;
    }

    if (l && r) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((response) => showMessage(response));
