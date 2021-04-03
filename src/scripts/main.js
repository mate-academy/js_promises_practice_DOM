'use strict';

const logo = document.querySelector('.logo');
const body = document.querySelector('body');
const inner = document.createElement('div');

inner.classList.add('inner');
body.append(inner);

function creatingMessage(message, className) {
  const elementMessage = document.createElement('div');
  const styleForInner = document.querySelector('.inner');

  elementMessage.dataset.qa = 'notification';
  elementMessage.classList.add(className);
  elementMessage.textContent = message;
  inner.append(elementMessage);
  styleForInner.style.display = 'block';
}

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => {
    creatingMessage('First promise was resolved', 'success');
  })
  .catch(() => {
    creatingMessage('First promise was rejected', 'warning');
  });

const secondPromise = new Promise((resolve) => {
  logo.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve();
    }
  });
});

secondPromise.then(() => {
  creatingMessage('Second promise was resolved', 'success');
});

const thirdPromise = new Promise((resolve) => {
  let leftClick;
  let rightClick;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break;
    };

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    creatingMessage('Third promise was resolved', 'success');
  });
