'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const message = 'First promise was resolved';
  const errorMessage = 'First promise was reject';

  body.addEventListener('click', () => resolve(message));

  setTimeout(() => {
    reject(errorMessage);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const message = 'Second promise was resolved';

  body.addEventListener('click', () => resolve(message));
  body.addEventListener('contextmenu', () => resolve(message));
});

const thirdPromise = new Promise((resolve) => {
  const message = 'Third promise was resolved';
  let onClick = false;
  let onContextmenuClick = false;

  body.addEventListener('click', () => {
    onClick = true;

    if (onContextmenuClick) {
      resolve(message);
    }
  });

  body.addEventListener('contextmenu', () => {
    onContextmenuClick = true;

    if (onClick) {
      resolve(message);
    }
  });
});

const messageOutput = (message, className) => {
  body.insertAdjacentHTML('beforeend', `
    <div class='${className}' data-qa="notification">${message}</div>
  `);
};

firstPromise
  .then(message => messageOutput(message, 'success'))
  .catch(message => messageOutput(message, 'warning'));

secondPromise
  .then(message => messageOutput(message, 'success'));

thirdPromise
  .then(message => messageOutput(message, 'success'));
