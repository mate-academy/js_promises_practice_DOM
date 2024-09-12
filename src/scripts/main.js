'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// --- func ---

function createMessage(nameClass, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = `${nameClass}`;
  div.textContent = `${message}`;

  document.body.insertAdjacentElement('beforeend', div);
}

// Promise 1

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', e => {
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

// Promise 2

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    return e.button === 0 || e.button === 2
      ? resolve('Second promise was resolved')
      : alert('Use only right or left click. The mousewheel will not work!');
  });
});

promise2
  .then(result => {
    createMessage('success', result);
  });

// Promise 3

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
