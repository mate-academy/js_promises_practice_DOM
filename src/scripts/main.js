'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', e => {
    if (e.buttons === 3) {
      resolve('Third promise was resolved');
    }
  });
});

function onSuccess(value) {
  document.body.innerHTML = `
    <div data-qa="notification" class="success">${value}</div>
  `;
}

function onError(value) {
  document.body.innerHTML = `
    <div data-qa="notification" class="warning">${value}</div>
  `;
}

promise1
  .then(onSuccess)
  .catch(onError);

promise2
  .then(onSuccess)
  .catch(onError);

promise3
  .then(onSuccess)
  .catch(onError);
