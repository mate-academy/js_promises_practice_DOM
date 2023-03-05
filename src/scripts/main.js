'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function createMessage(className, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = `${className}`;
  div.textContent = `${message}`;

  document.body.insertAdjacentElement('beforeend', div);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then(result => {
    createMessage('success', result);
  })
  .catch(result => {
    createMessage('warning', result);
  });

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

promise2
  .then(result => {
    createMessage('success', result);
  });

let leftClick = false;
let rightClick = false;

const promise3 = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise3
  .then(result => {
    createMessage('success', result);
  });
