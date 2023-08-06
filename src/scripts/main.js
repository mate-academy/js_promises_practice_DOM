'use strict';

const FIRST_PROMISE = {
  resolve: 'First promise resolve',
  reject: 'First promise was rejected',
  reject_time: 3000,
};
const SECOND_PROMISE = {
  resolve: 'Second promise was resolved',
};
const THIRD_PROMISE = {
  resolve: 'Third promise was resolved',
};

const onlyOnce = {
  once: true,
};

let lastButton;

function createDiv(text = '', classNames = '') {
  const el = document.createElement('div');

  el.dataset.qa = 'notification';
  el.textContent = text;
  el.classList = classNames;
  document.body.append(el);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () =>
    resolve(FIRST_PROMISE.resolve), onlyOnce);

  setTimeout(() => reject(new Error(FIRST_PROMISE.reject)),
    FIRST_PROMISE.reject_time);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', ({ button }) => {
    if ([0, 2].includes(button)) {
      resolve(SECOND_PROMISE.resolve);
      lastButton = button;
    };
  }, onlyOnce);
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', function eventListener({ button }) {
    if ([0, 2].includes(button) && button !== lastButton) {
      resolve(THIRD_PROMISE.resolve);
      document.removeEventListener('mousedown', eventListener);
    };
  });
});

firstPromise
  .then(result => createDiv(result, 'success'))
  .catch(error => createDiv(error, 'warning'));

secondPromise
  .then(result => createDiv(result, 'success'))
  .then(() => thirdPromise)
  .then(result => createDiv(result, 'success'));
