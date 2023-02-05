'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 && e.button === 2) {
      resolve('Third promise resolved');
    }
  });
});

const createNotification = (message, className) => {
  const success = document.createElement('div');

  success.dataset.qa = 'notification';

  success.textContent = message;
  document.body.appendChild(success);

  if (className === 'success') {
    success.classList.add('success');
  } else if (className === 'warning') {
    success.classList.add('warning');
  }
};

const resolver = promise => {
  promise
    .then(message => {
      createNotification(message, 'success');
    })
    .catch(message => {
      createNotification(message, 'warning');
    });
};

resolver(firstPromise);
resolver(secondPromise);
resolver(thirdPromise);
