'use strict';

const body = document.querySelector('body');

function firstPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('mousedown', (e) => {
      e.preventDefault();
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }, 3000);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    document.addEventListener('mousedown', (e) => {
      e.preventDefault();

      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    });
  });
}

function thirdPromise() {
  let rclick = false;
  let lclick = false;

  return new Promise((resolve) => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        rclick = true;
      } else if (e.button === 2) {
        lclick = true;
      }

      if (rclick === true && lclick === true) {
        resolve('Third promise was resolved');
      }
    });
  });
}

function notification(style) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = style;

  body.append(div);
}

const first = firstPromise();
const second = secondPromise();
const third = thirdPromise();

first.then(notification, notification);
second.then(notification);
third.then(notification);
