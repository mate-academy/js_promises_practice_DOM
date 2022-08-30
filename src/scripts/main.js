'use strict';

const createMessage = (result, text) => {
  document.body.insertAdjacentHTML('afterbegin', `
  <div class=${result} data-qa="notification">
    ${text}
  </div>
  `);
};

const promise1 = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }

    if (e.button === 2) {
      e.preventDefault();

      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve) => {
  let leftClick = null;
  let rightClick = null;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then(message => {
    createMessage('success', message);
  })
  .catch(error => {
    createMessage('warning', error);
  });

promise2
  .then(message => {
    createMessage('success', message);
  });

promise3
  .then(message => {
    createMessage('success', message);
  });
