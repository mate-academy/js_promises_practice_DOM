'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', () => {
    resolve(`Second promise was resolved`);
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  document.addEventListener('click', () => {
    left = true;

    if (right) {
      resolve(`Third promise was resolved`);
    }
  });

  document.addEventListener('contextmenu', () => {
    right = true;

    if (left) {
      resolve(`Third promise was resolved`);
    }
  });
});

const successHandle = (message) => {
  const notification = document.createElement('div');

  notification.classList.add('success');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  document.body.appendChild(notification);
};

const errorHandle = (error) => {
  const notification = document.createElement('div');

  notification.classList.add('error');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = error.message;

  document.body.appendChild(notification);
};

firstPromise.then(successHandle).catch(errorHandle);
secondPromise.then(successHandle).catch(errorHandle);
thirdPromise.then(successHandle).catch(errorHandle);
