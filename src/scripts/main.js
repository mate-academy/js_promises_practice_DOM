/* eslint-disable prefer-promise-reject-errors */
'use strict';

let promise1Resolve;
let promise2Resolve;
let promise3ResolvePartOne;
let promise3ResolvePartTwo;
const whichClick = {
  left: false,
  right: false,
};

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
  promise3ResolvePartOne = resolve;
})
  .then(async () => {
    return new Promise((resolve, reject) => {
      promise3ResolvePartTwo = resolve;
    });
  })
  .then((message) => createNotification('success', message))
  .catch((message) => createNotification('error', message));

document.addEventListener('click', (e) => {
  whichClick.left = true;
  promise1Resolve(`First promise was resolved`);
  promise2Resolve('Second promise was resolved');
  promise3ResolvePartOne();

  if (whichClick.right === true) {
    promise3ResolvePartTwo('Third promise was resolved');
  }
});

document.addEventListener('contextmenu', (e) => {
  whichClick.right = true;
  promise2Resolve('Second promise was resolved');
  promise3ResolvePartOne();

  if (whichClick.left === true) {
    promise3ResolvePartTwo('Third promise was resolved');
  }
});
