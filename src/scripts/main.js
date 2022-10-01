'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

promise1
  .then(result => successHandler(result))
  .catch(error => errorHandler(error));

promise2
  .then(result => successHandler(result))
  .catch(error => errorHandler(error));

promise3
  .then(result => successHandler(result))
  .catch(error => errorHandler(error));

function successHandler(result) {
  const div = document.createElement('div');

  div.classList.add('success', 'box');
  div.dataset.qa = 'notification';
  div.innerText = result;
  document.body.appendChild(div);
}

function errorHandler(error) {
  const div = document.createElement('div');

  div.classList.add('warning', 'box');
  div.dataset.qa = 'notification';
  div.innerText = error;
  document.body.appendChild(div);
}
