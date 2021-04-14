'use strict';

const addMessage = (message, className) => {
  const logo = document.querySelector('.logo');

  logo.insertAdjacentHTML('afterend',
    `
  <div class="${className}">
  ${message}
  </div>
  `
  );
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(value => addMessage(value, 'success'))
  .catch(error => addMessage(error, 'warning'));

new Promise(resolve => {
  document.addEventListener('mousedown', (click) => {
    click.preventDefault();

    if (click.button === 0 || click.button === 2) {
      click.preventDefault();
      resolve('Second promise was resolved');
    }
  });
}).then(value => addMessage(value, 'success'));

new Promise(resolve => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', click => {
    if (click.button === 0) {
      leftButton = true;
    }

    if (click.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
}).then(value => addMessage(value, 'success'));
