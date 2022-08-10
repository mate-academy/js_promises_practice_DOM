'use strict';

function notification(type, result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${type}">
      ${result}
    </div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (et) => {
    if (et.button === 0) {
      leftClick = true;
    }

    if (et.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved ');
    };
  });
});

firstPromise
  .then(result => notification('success', result))
  .catch(error => notification('warning', error));

secondPromise
  .then(result => notification('success', result));

thirdPromise
  .then(result => notification('success', result));
