'use strict';

const body = document.body;

function notification(message) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification">${message}</div>
  `);
};

function hamdlerPromise(order) {
  const handlerPromise = new Promise((resolve, reject) => {
    switch (order) {
      case 1:
        document.addEventListener('click', () => {
          resolve('First promise was resolved');
        });

        setTimeout(() => {
          reject(new Error('First promise was rejected'));
        }, 3000);
        break;

      case 2:
        document.addEventListener('click', () => {
          resolve('Second promise was resolved');
        });

        document.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          resolve('Second promise was resolved');
        });
        break;

      case 3:
        document.addEventListener('click', () => {
          document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            resolve('Third promise was resolved');
          });
        });

        document.addEventListener('contextmenu', () => {
          document.addEventListener('click', (e) => {
            e.preventDefault();
            resolve('Third promise was resolved');
          });
        });
    };
  });

  return handlerPromise;
};

function success(message) {
  notification(message);

  const el = document.querySelector('div[data-qa=notification]');

  el.classList.add('success');
};

function error(message) {
  notification(message.message);

  const el = document.querySelector('div[data-qa=notification]');

  el.classList.add('error');
};

hamdlerPromise(1)
  .then(success)
  .catch(error);

hamdlerPromise(2)
  .then(success);

hamdlerPromise(3)
  .then(success);
