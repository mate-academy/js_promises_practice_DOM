'use strict';

const doc = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    resolve();
  });

  doc.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  doc.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });

  doc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => addMessage('First promise was resolved', 'success'))
  .catch((error) => addMessage(error.message, 'error'));

secondPromise.then(() => addMessage('Second promise was resolved', 'success'));

thirdPromise
  .then(() => addMessage('Third promise was resolved', 'success'))
  .catch((error) => addMessage(error.message, 'error'));

function addMessage(text, className) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(className);
  div.textContent = text;

  document.body.appendChild(div);
}
