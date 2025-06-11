/* eslint-disable prefer-promise-reject-errors */
'use strict';

let promise1Resolve;
let promise2Resolve;
let promise3Resolve;

const whichClick = {
  left: false,
  right: false,
};

function checkPromise3() {
  if (whichClick.left && whichClick.right) {
    promise3Resolve('Third promise was resolved');
  }
}

function createNotification(className, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = className;
  div.textContent = message;
  document.body.appendChild(div);
}

// eslint-disable-next-line no-unused-vars
const firstPromise = new Promise((resolve, reject) => {
  promise1Resolve = resolve;
  setTimeout(() => reject(`First promise was rejected`), 3000);
})
  .then((message) => {
    createNotification('success', message);
  })
  .catch((message) => {
    createNotification('error', message);
  });

// eslint-disable-next-line no-unused-vars
const secondPromise = new Promise((resolve, reject) => {
  promise2Resolve = resolve;
})
  .then((message) => {
    createNotification('success', message);
  })
  .catch((message) => {
    createNotification('error', message);
  });

// eslint-disable-next-line no-unused-vars
const thirdPromise = new Promise((resolve, reject) => {
  promise3Resolve = resolve;
})
  .then((message) => createNotification('success', message))
  .catch((message) => createNotification('error', message));

document.addEventListener('click', (e) => {
  whichClick.left = true;
  promise1Resolve(`First promise was resolved`);
  promise2Resolve('Second promise was resolved');
  checkPromise3();
});

document.addEventListener('contextmenu', (e) => {
  whichClick.right = true;
  promise2Resolve('Second promise was resolved');
  checkPromise3();
});
