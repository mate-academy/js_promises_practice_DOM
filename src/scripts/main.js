'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve) => {
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

const promise3 = new Promise((resolve) => {
  Promise.all([leftClick, rightClick])
    .then(() => resolve('Third promise was resolved'));
});

promise1
  .then(onSuccess)
  .catch(onError);

promise2
  .then(onSuccess)
  .catch(onError);

promise3
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
