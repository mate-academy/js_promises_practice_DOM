'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  resolve('Third promise was resolved');
});

secondPromise
  .then((result) => {
    createMessage('success', result);

    return firstPromise;
  })
  .then((result) => {
    createMessage('success', result);

    return thirdPromise;
  }).then(result => {
    createMessage('success', result);
  })
  .catch(err => {
    createMessage('warning', err);
  });

const createMessage = (className, textContent) => {
  document.body.insertAdjacentHTML('beforebegin', `
  <div class="${className}" qa="notification">
    ${textContent}
  </div>
  `);
};
