'use strict';

const body = document.querySelector('body');

function error(message) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="warning">
    ${message}
  </div>
  `);
}

function success(message) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="success">
    ${message}
  </div>
  `);
}

const firstPromise = new Promise(function(resolve, reject) {
  document.addEventListener('mousedown', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() =>
    reject(new Error(`First promise was rejected`)), 3000);
});

const secondPromise = new Promise(function(resolve) {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

const thirdPromise = new Promise(function(resolve, reject) {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise.then(() => {
  success('succes', `First promise was resolved`);
});

firstPromise.catch(() => {
  error('warning', `First promise was rejected`);
});

secondPromise.then(() => {
  success('succes', `Second promise was resolved`);
});

thirdPromise.then(() => {
  success('succes', `Third promise was resolved`);
});
