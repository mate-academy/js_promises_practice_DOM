'use strict';

const body = document.body;

const message = (type, text) => {
  const div = `<div data-qa="notification" class="${type}">${text}</div>`;

  body.insertAdjacentHTML('beforeend', div);
};

const promise1 = () => {
  return new Promise((resolve, reject) => {
    document.body.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });
};

const promise2 = () => {
  return new Promise((resolve) => {
    document.body.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    });
  });
};

const promise3 = () => {
  return new Promise((resolve) => {
    document.body.addEventListener('mousedown', (e) => {
      if (e.button === 0 && e.button === 2) {
        resolve('Third promise was resolved');
      }
    });
  });
};

promise1()
  .then(result => {
    message('success', result);
  })
  .catch(error => {
    message('warning', error);
  });

promise2()
  .then(result => {
    message('success2', result);
  });

promise3()
  .then(result => {
    message('success2', result);
  });
