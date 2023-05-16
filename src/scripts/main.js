'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

promise1
  .then((successfully) => message(successfully, 'success'))
  .catch((error) => message(error, 'warning'));

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

promise2
  .then((successfully) => message(successfully, 'success'));

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  body.addEventListener('click', () => {
    leftClick = true;

    if (rightClick) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise3
  .then((successfully) => message(successfully, 'success'));

function message(textMessage, className) {
  body.insertAdjacentHTML('beforeend', `
    <div class="${className}" data-qa="notification">
      ${textMessage}
    </div>
  `);
};
