'use strict';

const logo = document.querySelector('.logo');

function addElement(message, className = 'success') {
  document.body.insertAdjacentHTML('beforeend', `
  <div class="${className}" data-qa="notification">${message}</div>
  `);
};

const promise1 = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  logo.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  logo.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  logo.addEventListener('mousedown', firstEv => {
    logo.addEventListener('mousedown', secondEv => {
      if ((firstEv.button === 0 && secondEv.button === 2)
      || (secondEv.button === 0 && firstEv.button === 2)) {
        resolve('Third promise was resolved');
      }
    });
  });
});

promise1
  .then((result) => {
    addElement(result);
  })
  .catch((result) => {
    addElement(result, 'warning');
  });

promise2
  .then((result) => {
    addElement(result);
  });

promise3
  .then((result) => {
    addElement(result);
  });
