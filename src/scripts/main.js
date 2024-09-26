'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([leftClick, rightClick])
    .then(() => resolve('Third promise was resolved'));
});

firstPromise
  .then(onSuccess)
  .catch(onError);

secondPromise
  .then(onSuccess)
  .catch(onError);

thirdPromise
  .then(onSuccess)
  .catch(onError);

function onSuccess(success) {
  document.body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">${success}
      </div>
    `);
}

function onError(error) {
  document.body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="warning">${error}
      </div>
    `);
}
