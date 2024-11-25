'use strict';

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  resolve('Second promise was resolved');
});
const thirdPromise = new Promise((resolve) => {
  resolve('Third promise was resolved');
});

firstPromise.catch((text) => createNotification(text, true));

const count = new Set();

logo.addEventListener('click', () => {
  firstPromise.then((text) => createNotification(text)).catch(() => {});
});

document.addEventListener('click', () => {
  count.add('l');

  releaseSecondThird();
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  count.add('r');

  releaseSecondThird();
});

function releaseSecondThird() {
  secondPromise.then((text) => createNotification(text));

  if (count.has('r') && count.has('l')) {
    thirdPromise.then((text) => createNotification(text));
  }
}

function createNotification(text, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = text;

  if (isError) {
    div.className = 'error';
  } else {
    div.className = 'success';
  }

  document.body.append(div);
}
