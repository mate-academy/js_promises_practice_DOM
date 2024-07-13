'use strict';
'use strict';

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  logo?.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error('First promise was rejected!')), 3000);
});

const leftClickProm = new Promise((resolve, reject) => {
  logo?.addEventListener('click', (e) => {
    resolve('promise was resolved');
  });
});
const rightClickProm = new Promise((resolve, reject) => {
  logo?.addEventListener('contextmenu', (e) => {
    resolve('promise was resolved');
  });
});

const secondPromise = Promise.any([leftClickProm, rightClickProm]);

const thirdPromise = Promise.all([leftClickProm, rightClickProm]);

firstPromise
  .then((result) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<div data-qa="notification" class="success">First Promise resolved</div>',
    );
  })
  .catch((err) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">First Promise rejected</div>`,
    );
  });

secondPromise
  .then((result) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<div data-qa="notification" class="success">Second Promise resolved</div>',
    );
  })
  .catch((err) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">Second Promise rejected</div>`,
    );
  });

thirdPromise
  .then((result) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<div data-qa="notification" class="success">Third Promise resolved</div>',
    );
  })
  .catch((err) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">Third Promise rejected</div>`,
    );
  });
