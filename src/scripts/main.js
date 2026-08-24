'use strict';

const bodyElement = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    resolve(`Second promise was resolved`);
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve(`Third promise was resolved`);
    }
  });

  document.addEventListener('contextmenu', (e) => {
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve(`Third promise was resolved`);
    }
  });
});

promise1
  .then((message) => {
    addNewNotification(message, 'success');
  })
  .catch((message) => {
    addNewNotification(message, 'error');
  });

promise2.then((message) => {
  addNewNotification(message, 'success');
});

promise3
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
