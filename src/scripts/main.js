'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => reject(Error()), 3000);
});

function getNotification(type, message) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${type}" data-qa="notification">
      ${message}
    </div>
  `);
};

firstPromise
  .then(() => getNotification('success', 'First promise was resolved'))
  .catch(() => getNotification('error', 'First promise was rejected'));

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve();
  });
});

secondPromise
  .then(() => getNotification('success', 'Second promise was resolved'));

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rigthClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = Promise.all([leftClick, rigthClick]);

thirdPromise
  .then(() => getNotification('success', 'Third promise was resolved'));
