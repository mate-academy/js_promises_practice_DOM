'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then((result) => {
    message(result, 'success');
  })
  .catch((err) => {
    message(err, 'warning');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve(true);
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(true);
  });
});

secondPromise.then(() => {
  message('Second promise was resolved', 'success');
});

const thirdPromise = Promise.all([
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve(true);
    });
  }),
  new Promise((resolve) => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve(true);
    });
  }),
]);

thirdPromise.then(() => {
  message('Third promise was resolved', 'success');
});

function message(promMessage, type) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="${type}">${promMessage}</div>`,
  );
}
