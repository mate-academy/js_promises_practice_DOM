'use strict';

const body = document.querySelector('body');
const successHandler = message => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${message}
    </div>
  `);
};
const errorHandler = message => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${message}
    </div>
  `);
};
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    e.preventDefault();

    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});
const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', e => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});
const leftClickPromise = new Promise(resolve => {
  document.addEventListener('mousedown', e => {
    e.preventDefault();

    if (e.button === 0) {
      resolve();
    }
  });
});
const rightClickPromise = new Promise(resolve => {
  document.addEventListener('mousedown', e => {
    e.preventDefault();

    if (e.button === 2) {
      resolve();
    }
  });
});
const thirdPromise = new Promise(resolve => {
  leftClickPromise
    .then(() => rightClickPromise)
    .then(() => resolve('Third promise was resolved'));
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
