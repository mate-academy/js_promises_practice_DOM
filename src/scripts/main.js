'use strict';

function createNotification(className, message) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="notification ${className}">
        ${message}
    </div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(resolved => {
    createNotification('success', resolved);
  }).catch(rejected => {
    createNotification('warning', rejected);
  });

let leftButton;
let rightButton;

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton || rightButton) {
      resolve('Second promise was resolved');
    }
  });
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  return false;
});

secondPromise
  .then(data => {
    createNotification('success', data);
  });

const thirdPromise = new Promise(resolve => {
  document.addEventListener('mousedown', () => {
    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(data => {
    createNotification('success', data);
  });
