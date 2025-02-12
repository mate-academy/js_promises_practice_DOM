'use strict';

function showMessage(text, isSuccess) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add(isSuccess ? 'success' : 'error');
  message.textContent = text;
  document.body.appendChild(message);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

promise1
  .then((result) => showMessage(result, true))
  .catch((error) => showMessage(error, false));

const promise2 = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');

    e.preventDefault();
  });

  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

promise2.then((result) => showMessage(result, true));

const promise3 = new Promise((resolve) => {
  let right = false;
  let left = false;

  function checkBoth() {
    if (left && right) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    left = true;
    checkBoth();
  });

  document.addEventListener('contextmenu', (e) => {
    right = true;
    checkBoth();
  });
});

promise3.then((result) => showMessage(result, true));
