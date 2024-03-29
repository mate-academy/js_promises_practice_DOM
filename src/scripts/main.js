'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener('click', () => {
    if (right) {
      resolve('Third promise was resolved');
    }

    left = true;
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    right = true;

    if (left) {
      resolve('Third promise was resolved');
    }
  });
});

const success = (result) => {
  const message = document.createElement('div');

  message.className = 'success';
  message.dataset.qa = 'notification';
  message.innerText = result;
  document.body.prepend(message);
};

const error = (result) => {
  const message = document.createElement('div');

  message.className = 'error';
  message.dataset.qa = 'notification';
  message.innerText = result;
  document.body.prepend(message);
};

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
