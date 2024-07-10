'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const setTimeOut = setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clearTimeout(setTimeOut);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createMessage(message, error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  if (error) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }
  div.innerText = message;
  document.body.append(div);
}

firstPromise
  .then((message) => {
    createMessage(message);
  })
  .catch((message) => {
    createMessage(message, true);
  });

secondPromise.then((message) => {
  createMessage(message);
});

thirdPromise.then((message) => {
  createMessage(message);
});
