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

  body.addEventListener('mousedown', () => resolve(message));
});

const thirdPromise = new Promise((resolve) => {
  const message = 'Third promise was resolved';

  let leftClick = false;
  let rightClick = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
      // check if the right mouse button has been pressed
      // if the right was pressed earlier, and now the left is executed resolve
      rightClick && resolve(message);
    }

    if (e.button === 2) {
      rightClick = true;
      // check if the left mouse button has been pressed
      // if before the left was pressed, and now the right is executed resolve
      leftClick && resolve(message);
    }
  }
  );
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
