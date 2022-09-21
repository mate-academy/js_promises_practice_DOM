'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', e => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick;
  let rightClick;

  body.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function success(message) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="success">
    ${message}
  </div>
  `);
}

function error(message) {
  body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="warning">
    ${message}
  </div>
  `);
}

firstPromise.then(success, error);
secondPromise.then(success);
thirdPromise.then(success);
