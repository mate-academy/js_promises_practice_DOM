'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

function onSuccess(success) {
  const messege = document.createElement('div');

  messege.classList.add('success');
  messege.innerText = success;
  messege.dataset.qa = 'notification';
  body.append(messege);
};

function onError(error) {
  const messege = document.createElement('div');

  messege.classList.add('warning');
  messege.innerText = error;
  messege.dataset.qa = 'notification';
  body.append(messege);
};

firstPromise
  .then(onSuccess, onError);

secondPromise
  .then(onSuccess, onError);

const leftClick = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });
});

const rightClick = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    resolve('Third promise was resolved');
  });
});

Promise.all([leftClick, rightClick])
  .then(() => thirdPromise)
  .then(onSuccess, onError);
