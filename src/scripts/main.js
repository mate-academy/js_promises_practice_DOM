'use strict';

function showMessage(condition, message) {
  const div = document.createElement('div');

  div.classList = condition;
  div.setAttribute('data-qa', 'notification');
  div.innerText = message;

  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => resolve());

  setTimeout(() => reject(new Error()), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    showMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    showMessage('warning', 'First promise was rejected');
  });

secondPromise
  .then(() => {
    showMessage('success', 'Second promise was resolved');
  });

thirdPromise
  .then(() => {
    showMessage('success', 'Third promise was resolved');
  });
