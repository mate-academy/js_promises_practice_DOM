'use strict';

const createMessage = (className, text) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${className}" data-qa="notification">
      ${text}
    </div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve(`First promise was resolved`);
    }
  });

  setTimeout(() => {
    reject(new Error('`First promise was rejected`'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    };
  });
});

firstPromise
  .then(result => createMessage('success', result))
  .catch(error => createMessage('warning', error));

secondPromise.then(result => createMessage('success', result));
thirdPromise.then(result => createMessage('success', result));
