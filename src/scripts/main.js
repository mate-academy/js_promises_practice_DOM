'use strict';

const body = document.querySelector('body');

function onSuccess(message) {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  body.append(div);
}

function onError(message) {
  const div = document.createElement('div');

  div.className = 'error';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  body.append(div);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  const actions = [0, 0];

  document.addEventListener('click', () => {
    actions[0] += 1;

    if (actions[0] > 0 && actions[1] > 0) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    actions[1] += 1;

    if (actions[0] > 0 && actions[1] > 0) {
      resolve('Third promise was resolved');
    }
  });
});

promise1.then(onSuccess).catch(onError);
promise2.then(onSuccess).catch();
promise3.then(onSuccess).catch();
