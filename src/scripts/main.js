'use strict';

const setMessage = (text, className) => {
  const newDiv = document.createElement('div');

  newDiv.dataset.qa = 'notification';
  newDiv.classList.add(className);
  newDiv.innerText = text;

  document.body.append(newDiv);
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

promise1
  .then((success) => setMessage(success, 'success'))
  .catch((error) => setMessage(error, 'error'));

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }

    resolve('Second promise was resolved');
  });
});

promise2.then((success) => setMessage(success, 'success'));

const promise3 = new Promise((resolve, reject) => {
  let right = false;
  let left = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (right && left) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then((success) => setMessage(success, 'success'));
