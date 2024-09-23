'use strict';

let leftbt = false;
let rightbt = false;

function appM(message, className) {
  const messageElem = document.createElement('div');

  messageElem.className = className;
  messageElem.textContent = message;
  messageElem.dataset.qa = 'notification';
  document.body.appendChild(messageElem);
}

const promise1 = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick); // Видалити обробник
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', handleClick);
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const promise3 = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftbt = true;
    } else if (e.button === 2) {
      rightbt = true;
    }

    if (leftbt && rightbt) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

promise1
  .then((message) => appM(message, 'success'))
  .catch((error) => appM(error.message, 'error'));

promise2.then((message) => appM(message, 'success'));
promise3.then((message) => appM(message, 'success'));
