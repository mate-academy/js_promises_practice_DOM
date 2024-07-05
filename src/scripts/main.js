'use strict';

function createDiv(...classList) {
  const div = document.createElement('div');

  div.classList.add(...classList);

  return div;
}

function callbackPromise(data, isError = false) {
  const classList = [];

  if (isError) {
    classList.push('error');
  } else {
    classList.push('success');
  }

  const message = createDiv(...classList);

  message.setAttribute('data-qa', 'notification');
  message.innerHTML = data?.message ? data.message : data;
  document.body.prepend(message);
}

const firstPromise = new Promise((resolve, reject) => {
  addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  addEventListener('mousedown', () => {
    resolve('Second promise was resolved!');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeft = false;
  let isRight = false;

  addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isLeft = true;
    }

    if (e.button === 2) {
      isRight = true;
    }

    if (isLeft && isRight) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(callbackPromise)
  .catch((error) => callbackPromise(error, true));
secondPromise.then(callbackPromise);
thirdPromise.then(callbackPromise);
