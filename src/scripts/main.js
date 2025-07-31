'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', function () {
    clearTimeout(timeoutId);
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve) => {
  function handler() {
    resolve('Second promise was resolved');
  }
  document.addEventListener('click', handler, { once: true });
  document.addEventListener('contextmenu', handler, { once: true });
});

const promise3 = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkBothClicked() {
    if (leftClicked && rightClicked) {
      resolve(`Third promise was resolved`);
    }
  }

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkBothClicked();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      rightClicked = true;
      checkBothClicked();
    }
  });
});

function showNotification(type, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message;
  document.body.append(div);
}

promise1
  .then((msg) => showNotification('success', msg))
  .catch((err) => showNotification('error', err.message));

promise2.then((msg) => showNotification('success', msg));

promise3.then((msg) => showNotification('success', msg));
