'use strict';

const createNotification = (className, text) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class='${className}'>${text}</div>`);
};

const leftButton = new Promise((resolve) => {
  document.addEventListener('click', resolve);
});

const rightButton = new Promise((resolve) => {
  document.addEventListener('contextmenu', resolve);
});

const firstPromise = new Promise((resolve, reject) => {
  leftButton.then(() => resolve('First promise was resolved'));

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  Promise.race([leftButton, rightButton])
    .then(() => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([leftButton, rightButton])
    .then(() => resolve('Third promise was resolved'));
});

firstPromise
  .then(r => createNotification('success', r))
  .catch(er => createNotification('warning', er));

secondPromise
  .then(r => createNotification('success', r));

thirdPromise
  .then(r => createNotification('success', r));
