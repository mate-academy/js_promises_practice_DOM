'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (e) => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

let leftClicked = false;
let rightClicked = false;
let result = true;

const thirdPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then((message) => {
    newNotification(message, result);
  })
  .catch((message) => {
    result = false;
    newNotification(message, result);
  });

secondPromise.then((message) => {
  result = true;
  newNotification(message, result);
});

thirdPromise.then((message) => {
  result = true;
  newNotification(message, result);
});

const newNotification = (message, res) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', `notification`);
  notification.textContent = message;

  if (result) {
    notification.classList.add('success');
  } else {
    notification.classList.add('error');
  }

  document.body.appendChild(notification);
};
