'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('Timeout Error'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let left = 0;
  let right = 0;

  document.addEventListener('mousedown', (e) => {
    left += e.button;
    right += e.button;

    if (left && right) {
      resolve();
    }
  });
});

const createNotification = (text, type) => {
  const message = document.createElement('div');

  message.className = type;
  message.innerText = text;
  message.setAttribute('data-qa', 'notification');
  document.body.append(message);
};

firstPromise
  .then(() => {
    createNotification('Promise was resolved!', 'success');
  })
  .catch(() => {
    createNotification('Promise was rejected!', 'warning');
  });

secondPromise
  .then(() => {
    createNotification(`Second promise was resolved`, 'success');
  });

thirdPromise
  .then(() => {
    createNotification(`Third promise was resolved`, 'success');
  });
