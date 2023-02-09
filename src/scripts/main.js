'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const leftMouseButton = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightMouseButton = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 2) {
      resolve();
    };
  });
});

const secondPromise = new Promise((resolve, reject) => {
  Promise.race([leftMouseButton, rightMouseButton])
    .then(() => {
      resolve(`Second promise was resolved`);
    });
});

const thirdPromise = new Promise((resolve, reject) => {
  Promise.all([leftMouseButton, rightMouseButton])
    .then(() => {
      resolve(`Third promise was resolved`);
    });
});

const successNotification = result => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${result}
    </div>
  `);
};

const warningNotification = error => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${error}
    </div>
  `);
};

firstPromise
  .then(successNotification)
  .catch(warningNotification);

secondPromise.then(successNotification);

thirdPromise.then(successNotification);
