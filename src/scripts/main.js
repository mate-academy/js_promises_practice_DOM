/* eslint-disable no-console */
'use strict';

const notification = (message, className) =>
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${className}">
      ${message}
    </div>
  `);

const resolver1 = (resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
};

const promise1 = new Promise(resolver1);

promise1
  .then((mess) => notification(mess, 'success'))
  .catch((err) => notification(err, 'warning'));

const resolver2 = (resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
};

const promise2 = new Promise(resolver2);

promise2
  .then((mess) => notification(mess, 'success'))
  .catch((err) => {
    console.warn(err);
  });

const promise3LeftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const promise3RightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const promise3 = Promise.all([promise3LeftClick, promise3RightClick]);

promise3
  .then(() => notification('Third promise was resolved', 'success'))
  .catch((err) => {
    console.warn(err);
  });
