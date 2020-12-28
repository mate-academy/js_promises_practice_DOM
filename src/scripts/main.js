'use strict';

const messageBlock = document.getElementById('message');

messageBlock.style.position = 'fixed';
messageBlock.style.top = `10px`;
messageBlock.style.right = `10px`;

const pushNotification = (description, type, id) => {
  const div = document.getElementById(id);

  div.classList.add(type, 'message');
  div.textContent = `${description}`;
};

// #1

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('Clicked');
  });

  setTimeout(() => {
    reject(new Error('Error'));
  }, 3000);
});

promise1
  .then(() => {
    pushNotification('First promise was resolved', 'success', 'promise1');
  })
  .catch(() => {
    pushNotification('First promise was rejected', 'warning', 'promise1');
  });

// #2

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Clicked');
    }
  });
});

promise2
  .then(() => {
    pushNotification('Second promise was resolved', 'success', 'promise2');
  });

const promise3 = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left === true && right === true) {
      resolve('Clicked');
    }
  });
});

promise3
  .then(() => {
    pushNotification('Third promise was resolved', 'success', 'promise3');
  });
