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

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  document.addEventListener('click', () => {
    left = true;

    if (left === true && right === true) {
      resolve('Third promise was resolved');
    };
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    right = true;

    if (left === true && right === true) {
      resolve('Third promise was resolved');
    };
  });
});

const success = data => {
  const div = document.createElement('div');

  div.className = 'success';
  div.dataset.qa = 'notification';
  div.textContent = data;
  document.body.append(div);
};

const error = data => {
  const div = document.createElement('div');

  div.className = 'warning';
  div.dataset.qa = 'notification';
  div.textContent = data;
  document.body.append(div);
};

promise1
  .then(success)
  .catch(error);

promise2
  .then(success)
  .catch(error);

promise3
  .then(success)
  .catch(error);
