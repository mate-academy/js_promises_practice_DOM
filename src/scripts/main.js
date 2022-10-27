'use strict';

function innerMessage(message, innerClass) {
  document.body.insertAdjacentHTML('beforeend',
   `<div class="${innerClass}" data-qa="notification">${message}</div>`
  );
}

const promise1 = new Promise(function(resolve, reject) {
  document.body.addEventListener('click', () => resolve());

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(() => innerMessage('First promise was resolved', 'success'))

  .catch(() => innerMessage('First promise was rejected', 'warning'));


const promise2 = new Promise(function(resolve, reject) {
  document.body.addEventListener('click', () => resolve());

  document.body.addEventListener('contextmenu', () => resolve());
});

promise2.then(() => innerMessage('Second promise was resolved', 'success'));


const promise3 = new Promise(function(resolve, reject) {
  let leftButtonClick = false;
  let rightButtonClick = false;

  document.body.addEventListener('click', () => {
    leftButtonClick = true;

    if (leftButtonClick && rightButtonClick) {
      resolve();
    }
  });

  document.body.addEventListener('contextmenu', () => {
    rightButtonClick = true;

    if (leftButtonClick === true && rightButtonClick === true) {
      resolve();
    }
  });
});

promise3.then(() => innerMessage('Third promise was resolved', 'success'));
