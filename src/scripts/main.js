'use strict';

const body = document.querySelector('body');

body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', ev => {
    if (ev.button === 0) {
      resolve();
    };
  });

  setTimeout(() => reject(new Error()), 3000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('mousedown', ev => {
    if (ev.button === 0 || ev.button === 2) {
      resolve();
    };
  });
});

const promise3 = new Promise((resolve) => {
  body.addEventListener('mousedown', ev1 => {
    body.addEventListener('mousedown', ev2 => {
      if ((ev1.button === 0 && ev2.button === 2)
      || (ev1.button === 2 && ev2.button === 0)) {
        resolve();
      };
    });
  });
});

promise1.then(() => {
  body.insertAdjacentHTML('beforeend',
    '<div data-qa="notification">First promise was resolved</div>');
})
  .catch(() => {
    body.insertAdjacentHTML('beforeend',
      '<div data-qa="notification">First promise was rejected</div>');
  });

promise2.then(() => {
  body.insertAdjacentHTML('beforeend',
    '<div data-qa="notification">Second promise was resolved</div>');
});

promise3.then(() => {
  body.insertAdjacentHTML('beforeend',
    '<div data-qa="notification">Third promise was resolved</div>');
});
