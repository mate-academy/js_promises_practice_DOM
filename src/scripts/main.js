'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve('First promise was resolved'));

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftdown = false;
  let rightdown = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftdown = true;
    }

    if (e.button === 2) {
      rightdown = true;
    }

    if (leftdown && rightdown) {
      leftdown = false;
      rightdown = false;
      resolve('Third promise was resolved');
    }
  });
});

function messageCreat(text, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.textContent = text;

  if (type === 'success') {
    div.classList.add('success');
  }

  if (type === 'error') {
    div.classList.add('error');
  }

  body.append(div);
}

function PromisesStarts() {
  firstPromise
    .then((data) => messageCreat(data, 'success'))
    .catch((data) => messageCreat(data, 'error'));

  secondPromise
    .then((data) => messageCreat(data, 'success'))
    .catch((data) => messageCreat(data, 'error'));

  thirdPromise
    .then((data) => messageCreat(data, 'success'))
    .catch((data) => messageCreat(data, 'error'));
}

PromisesStarts();
