'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

function printMessage(className, text) {
  body.insertAdjacentHTML('beforeend', `
    <div class="${className}" data-qa="notification">
      ${text}
    </div>
  `);
}

promise1
  .then(result => {
    printMessage('succes', result);
  })
  .catch(result => {
    printMessage('warning', result);
  });

promise2
  .then(result => {
    printMessage('succes', result);
  })
  .catch(result => {
    printMessage('warning', result);
  });

promise3
  .then(result => {
    printMessage('succes', result);
  })
  .catch(result => {
    printMessage('warning', result);
  });
