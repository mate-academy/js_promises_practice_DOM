'use strict';

function showMessage(description, type) {
  const message = document.createElement('div');

  message.classList.add(type);
  message.dataset.qa = 'notification';
  message.innerText = description;
  document.body.append(message);
}

document.addEventListener('contextmenu', e => e.preventDefault());

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => reject(Error()), 3000);

  document.addEventListener('mousedown', () => resolve());
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftButClicked = false;
  let rightButClicked = false;

  document.addEventListener('mousedown', e => {
    switch (e.button) {
      case 0:
        leftButClicked = true;
        break;
      case 2:
        rightButClicked = true;
        break;
    }

    if (leftButClicked && rightButClicked) {
      resolve();
    }
  });
});

promise1
  .then(() => showMessage('First promise was resolved', 'success'))
  .catch(() => showMessage('First promise was rejected', 'warning'));

promise2
  .then(() => showMessage('Second promise was resolved', 'success'));

promise3
  .then(() => showMessage('Third promise was resolved', 'success'));
