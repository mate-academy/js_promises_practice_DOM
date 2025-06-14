'use strict';

const createPush = (className, text) => {
  const div = document.createElement('div');

  div.innerText = text;
  div.className = className;
  div.setAttribute('data-qa', 'notification');
  document.body.append(div);
};

document.addEventListener('contextmenu', (e) => e.preventDefault());

const promisesState = [];

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 && !promisesState.includes('firstPromiseCompleted')) {
      resolve('First promise was resolved');
      promisesState.push('firstPromiseCompleted');
    }
  });

  setTimeout(() => {
    if (!promisesState.includes('firstPromiseCompleted')) {
      reject(new Error('First promise was rejected'));
      promisesState.push('firstPromiseCompleted');
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (
      (e.button === 0 || e.button === 2) &&
      !promisesState.includes('secondPromiseCompleted')
    ) {
      resolve('Second promise was resolved');
      promisesState.push('secondPromiseCompleted');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (!promisesState.includes('thirdPromiseCompleted')) {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        promisesState.push('thirdPromiseCompleted');
      }
    }
  });
});

firstPromise
  .then((message) => createPush('message', message))
  .catch((err) => createPush('message error', err.message));
secondPromise.then((message) => createPush('message', message));
thirdPromise.then((message) => createPush('message', message));
