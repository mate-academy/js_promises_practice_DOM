'use strict';

const notification = document.createElement('div');

const body = document.querySelector('body');
const first = 'First';
const second = 'Second';
const third = 'Third';

function success(value) {
  notification.setAttribute('data-qa', 'notification');
  notification.setAttribute('class', 'success');
  notification.textContent = `${value} promise was resolved`;
  body.append(notification);
}

function error(value) {
  notification.setAttribute('data-qa', 'notification');
  notification.setAttribute('class', 'error');
  notification.textContent = `${value} promise was rejected`;
  body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve(first), {once: true});

  setTimeout(() => reject(first), 3000);
});

firstPromise
  .then(value => success(value))
  .catch(value => error(value));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      e.preventDefault();
      resolve(second);
    }
  }, {once: true}
  )
});

secondPromise.then(value => success(value));

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      e.preventDefault();
      right = true;
    }

    if (left && right) {
      resolve(third);
    }
  })
});

thirdPromise.then(value => success(value));
