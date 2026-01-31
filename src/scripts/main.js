'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button !== 0) {
        return;
      }

      clearTimeout(timer);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handler = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('mousedown', handler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

const showSuccess = (text) => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add('success');
  message.textContent = text;
  body.append(message);
};

const showError = (text) => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add('error');
  message.textContent = text;
  body.append(message);
};

firstPromise.then(showSuccess).catch(showError);
secondPromise.then(showSuccess);
thirdPromise.then(showSuccess);
