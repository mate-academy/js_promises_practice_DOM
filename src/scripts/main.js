'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    showMessage(message, 'success');
  })
  .catch((message) => {
    showMessage(message, 'error');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((message) => {
    showMessage(message, 'success');
  })
  .catch((message) => {
    showMessage(message, 'error');
  });

const rightClick = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => {
    resolve('Third promise was resolved');
  });
});

const leftClick = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Third promise was resolved');
  });
});

const thirdPromise = Promise.all([rightClick, leftClick]);

thirdPromise
  .then(([message]) => {
    showMessage(message, 'success');
  })
  .catch((message) => {
    showMessage(message, 'error');
  });

function showMessage(messageText, statusType) {
  const message = document.createElement('div');

  message.textContent = messageText;

  message.setAttribute('data-qa', `notification`);
  message.classList.add(`${statusType}`);

  document.body.appendChild(message);
}
