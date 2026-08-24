'use strict';

const bodyElement = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkBoth = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkBoth();
    }
  }, { once: true });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      rightClicked = true;
      checkBoth();
    }
  }, { once: true });
});

firstPromise
  .then((message) => {
    addNewNotification(message, 'success');
  })
  .catch((message) => {
    addNewNotification(message, 'error');
  });

secondPromise.then((message) => {
  addNewNotification(message, 'success');
});

thirdPromise
  .then((message) => {
    addNewNotification(message, 'success');
  })
  .catch((message) => {
    addNewNotification(message, 'error');
  });

function addNewNotification(message, res) {
  const newElement = document.createElement('div');

  newElement.setAttribute('data-qa', 'notification');
  newElement.setAttribute('class', res);
  newElement.textContent = message;

  bodyElement.appendChild(newElement);
}
