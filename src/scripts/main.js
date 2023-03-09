'use strict';

function success(message) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <div data-qa="notification" class="success">
      ${message}
    </div>
  `
  );
}

function error(message) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <div data-qa="notification" class="warning">
      ${message}
    </div>
  `
  );
}

const firstPromise = new Promise((resolve, reject) => {
  let click;

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    click = true;
  });

  setTimeout(() => {
    if (!click) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick;
  let rightClick;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(success)
  .catch(error);

secondPromise
  .then(success)
  .catch(error);

thirdPromise
  .then(success)
  .catch(error);
