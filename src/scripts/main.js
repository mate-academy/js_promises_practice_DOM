'use strict';

const root = document.querySelector('body');

function onSuccess(resolve) {
  root.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${resolve}
    </div>
  `);
}

function onError(reject) {
  root.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${reject}
    </div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  root.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(result => onSuccess(result))
  .catch(error => onError(error));

const secondPromise = new Promise(resolve => {
  root.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });

  root.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then(result => onSuccess(result));

const thirdPromise = new Promise(resolve => {
  root.addEventListener('mousedown', () => {
    root.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });
});

thirdPromise.then(result => onSuccess(result));
