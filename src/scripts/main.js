'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left === true && right === true) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = data => {
  const div = document.createElement('div');

  div.className = 'success';
  div.dataset.qa = 'notification';
  div.textContent = data;
  document.body.append(div);
};

const errorHandler = data => {
  const div = document.createElement('div');

  div.className = 'warning';
  div.dataset.qa = 'notification';
  div.textContent = data;
  document.body.append(div);
};

promise1
  .then(successHandler)
  .catch(errorHandler);

promise2
  .then(successHandler)
  .catch(errorHandler);

promise3
  .then(successHandler)
  .catch(errorHandler);
