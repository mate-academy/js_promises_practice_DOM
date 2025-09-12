'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const clickHeandler = (e) => {
    if (e.button === 0) {
      document.removeEventListener('click', clickHeandler);
      clearTimeout(timeOutId);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', clickHeandler);

  const timeOutId = setTimeout(() => {
    document.removeEventListener('click', clickHeandler);
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const clickHeandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', clickHeandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHeandler);
});

const thirdPromise = new Promise((resolve) => {
  let leftdown = false;
  let rightdown = false;

  const thirdHeandler = (e) => {
    if (e.button === 0) {
      leftdown = true;
    }

    if (e.button === 2) {
      rightdown = true;
    }

    if (leftdown && rightdown) {
      document.removeEventListener('mousedown', thirdHeandler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', thirdHeandler);
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
