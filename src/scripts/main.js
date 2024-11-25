'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function checkIsBothAreClicked() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClick = true;

    checkIsBothAreClicked();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    checkIsBothAreClicked();
  });
});

const showNotification = (message, type) => {
  const div = document.createElement('div');

  div.className = `notification ${type}`;
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.appendChild(div);
};

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

secondPromise.then((message) => showNotification(message, 'success'));

thirdPromise.then((message) => showNotification(message, 'success'));
