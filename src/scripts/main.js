'use strict';

const success = (message) => {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');

  el.classList.add('success');

  el.textContent = message;

  document.body.append(el);
};

const error = (message) => {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');

  el.classList.add('warning');

  el.textContent = message;

  document.body.append(el);
};

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    const err = new Error('Second promise was rejected');

    reject(err);
  }, 3000);
});

const promiseRightClick = new Promise((resolve, reject) => {
  body.addEventListener('contextmenu', () => {
    resolve();
  });
});

const promiseLeftClick = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });
});

const promise2 = new Promise((resolve, reject) => {
  Promise.race([promiseRightClick, promiseLeftClick])
    .then(() => resolve('Second promise was resolved'));
});

const promise3 = new Promise((resolve, reject) => {
  Promise.all([promiseLeftClick, promiseRightClick])
    .then(() => resolve('Third promise was resolved'));
});

promise1
  .then(result => {
    success(result);
  })
  .catch(result => {
    error(result);
  });

promise2
  .then(result => {
    success(result);
  })
  .catch(result => {
    error(result);
  });

promise3
  .then(result => {
    success(result);
  })
  .catch(result => {
    error(result);
  });
