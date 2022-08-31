'use strict';

let rightClick;
let leftClick;

function showMessage(nameClass, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.classList.add(nameClass);
  div.innerHTML = message;
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

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;

      case 2:
        rightClick = true;
        break;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(message => {
    showMessage('success', message);
  })
  .catch(message => {
    showMessage('warning', message);
  });

secondPromise
  .then(message => {
    showMessage('success', message);
  });

thirdPromise
  .then(message => {
    showMessage('success', message);
  });
