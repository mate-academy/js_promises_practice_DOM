'use strict';

const body = document.querySelector('body');

function createNotification(message, result) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="notification notification--${result}">
      ${message}
    </div>`);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved', 'success');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'), 'warning');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  const message = 'Third promise was resolved';
  let leftClick;
  let rightClick;

  document.addEventListener('click', () => {
    rightClick
      ? resolve(message)
      : leftClick = true;
  });

  document.addEventListener('contextmenu', () => {
    leftClick
      ? resolve(message)
      : rightClick = true;
  });
});

firstPromise
  .then((message) => {
    createNotification(message, 'success');
  })
  .catch((message) => {
    createNotification(message, 'error');
  });

secondPromise
  .then((message) => {
    createNotification(message, 'success');
  });

thirdPromise
  .then((message) => {
    createNotification(message, 'success');
  });
