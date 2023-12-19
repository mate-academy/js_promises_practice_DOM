'use strict';

const success = (result) => {
  const created = document.createElement('div');

  created.className = 'success';
  created.dataset.qa = 'notification';
  created.innerText = result;
  document.body.appendChild(created);
};

const error = (result) => {
  const created = document.createElement('div');

  created.className = 'warning';
  created.dataset.qa = 'notification';
  created.innerText = result;
  document.body.appendChild(created);
};

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

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

promise1
  .then(message => success(message))
  .catch(error);

promise2
  .then(message => success(message));

const promise3 = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener('click', () => {
    left = true;

    if (right) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    right = true;

    if (left) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then(success);
