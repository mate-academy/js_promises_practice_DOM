'use strict';

const body = document.body;

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

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
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
  let leftClicked = false;
  let rightClicked = false;

  body.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(success, error);
secondPromise.then(success);
thirdPromise.then(success);
