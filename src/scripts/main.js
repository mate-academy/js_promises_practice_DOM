'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve(`First promise was resolved`);
    }
  });

  setTimeout(() => {
    reject(Error(`First promise was rejected`));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

const promise3 = new Promise((resolve) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve(`Third promise was resolved`);
    }
  });
});

const createNotification = (state, text) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${state}">
    ${text}
    </div>
  `);
};

const onSuccess = (message) => {
  createNotification('success', message);
};

const onError = (error) => {
  createNotification('warning', error);
};

promise1.then(onSuccess).catch(onError);
promise2.then(onSuccess);
promise3.then(onSuccess).catch(onError);
