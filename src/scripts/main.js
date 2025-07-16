'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isSettled = false;

  function onClick() {
    if (isSettled) {
      return;
    }
    isSettled = true;
    clearTimeout(timer);
    resolve('First promise was resolved');
    document.removeEventListener('click', onClick);
  }

  document.addEventListener('click', onClick);

  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', onClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  function handler(e) {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  }

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function handler(e) {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  }

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

const success = (message) => {
  const div = document.createElement('div');

  div.classList.add('message', 'success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.append(div);
};

const error = (message) => {
  const div = document.createElement('div');

  div.classList.add('message', 'error');
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.append(div);
};

firstPromise.then(success).catch(error);
secondPromise.then(success).catch(error);
thirdPromise.then(success).catch(error);
