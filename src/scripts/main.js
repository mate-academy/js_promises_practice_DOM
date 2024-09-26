'use strict';

const body = document.querySelector('body');

function notification(type, text) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${type}">${text}</div>
  `);
}

const success = function(promise) {
  return notification('success', `${promise}`);
};

const error = function(promise) {
  return notification('error', `${promise}`);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', e => {
    resolve('First promise was resolved');

    clearTimeout(rejectTimer);
  });

  const rejectTimer = setTimeout(
    () => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener(
    'click', () => resolve('Second promise was resolved'));

  document.addEventListener(
    'contextmenu', (clickEvent) => {
      clickEvent.preventDefault();
      resolve('Second promise was resolved');
    });
});

const thirdPromise = new Promise(resolve => {
  let right;
  let left;

  document.addEventListener('click', () => {
    left = true;

    if (right) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (clickEvent) => {
    right = true;

    if (left) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(success, error);
secondPromise.then(success, error);
thirdPromise.then(success, error);
