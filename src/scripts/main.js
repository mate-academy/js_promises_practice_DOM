'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  // eslint-disable-next-line no-shadow
  const onClick = (event) => {
    if (event.button === 0) {
      clicked = true;
      resolve('First promise was resolved on a left click in the document');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    if (!clicked) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected in 3 seconds');
      document.removeEventListener('click', onClick);
    }
  }, 3000);
});

// Second Promise
const secondPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  const onClick = (event) => {
    if (event.button === 0 || event.button === 2) {
      // Left or right click
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

// Third Promise
let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  const onClick = (event) => {
    if (event.button === 0) {
      leftClick = true;
    }

    if (event.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(
        // eslint-disable-next-line max-len
        'Third promise was resolved only after both left and right clicks happened',
      );
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

// Success handler
const successHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
};

// Error handler
const errorHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'error';
  div.textContent = message;
  document.body.appendChild(div);
};

// Adding handlers to promises
firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);

// To prevent the context menu on right click
document.addEventListener('contextmenu', (e) => e.preventDefault());
