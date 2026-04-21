'use strict';

const firstPromise = new Promise(function (resolve, reject) {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

firstPromise
  .then((str) => {
    const message = document.createElement('div');

    message.className = 'success';
    message.textContent = str;
    message.dataset.qa = 'notification';
    document.body.appendChild(message);
  })
  .catch((str) => {
    const message = document.createElement('div');

    message.className = 'error';
    message.textContent = str.message;
    message.dataset.qa = 'notification';
    document.body.appendChild(message);
  });

const secondPromise = new Promise(function (resolve) {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((str) => {
    const message = document.createElement('div');

    message.className = 'success';
    message.textContent = str;
    message.dataset.qa = 'notification';
    document.body.appendChild(message);
  })
  .catch(() => {});

const thirdPromise = new Promise(function (resolve) {
  let hasLeftClick = false;
  let hasRightClick = false;

  document.addEventListener('click', () => {
    hasLeftClick = true;

    if (hasLeftClick && hasRightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    hasRightClick = true;

    if (hasLeftClick && hasRightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((str) => {
    const message = document.createElement('div');

    message.className = 'success';
    message.textContent = str;
    message.dataset.qa = 'notification';
    document.body.appendChild(message);
  })
  .catch(() => {});
