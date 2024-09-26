'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.buttons === 1 || mouseEvent.buttons === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.buttons === 3) {
      resolve('Third promise was resolved');
    }
  });
});

const isSuccess = (data) => {
  const created = document.createElement('div');

  created.setAttribute('data-qa', 'notification');
  created.className = 'success';
  created.innerText = data;
  document.body.appendChild(created);
};

const isFailed = (data) => {
  const created = document.createElement('div');

  created.setAttribute('data-qa', 'notification');
  created.className = 'warning';
  created.innerText = data;
  document.body.appendChild(created);
};

firstPromise
  .then(isSuccess)
  .catch(isFailed);

secondPromise
  .then(isSuccess);

thirdPromise
  .then(isSuccess)
  .catch(isFailed);
