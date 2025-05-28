'use strict';

const mouseState = {
  leftPressed: false,
  rightPressed: false,
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });

  const timer = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    } else if (e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      mouseState.leftPressed = true;
    }

    if (e.button === 2) {
      mouseState.rightPressed = true;
    }

    if (mouseState.leftPressed && mouseState.rightPressed) {
      resolve('Third promise was resolved');
    }
  });
});

function handleSuccess(valueOfPromise) {
  const elementDiv = document.createElement('div');
  const paragraph = document.createElement('p');

  elementDiv.setAttribute('data-qa', 'notification');
  elementDiv.classList.add('success');
  paragraph.textContent = valueOfPromise;
  elementDiv.append(paragraph);
  document.body.append(elementDiv);
}

function handleError(valueOfPromise) {
  const elementDiv = document.createElement('div');
  const paragraph = document.createElement('p');

  elementDiv.setAttribute('data-qa', 'notification');
  elementDiv.classList.add('error');
  paragraph.textContent = valueOfPromise;
  elementDiv.append(paragraph);
  document.body.append(elementDiv);
}

firstPromise
  .then((value) => handleSuccess(value))
  .catch((value) => handleError(value));

secondPromise
  .then((value) => handleSuccess(value))
  .catch((value) => handleError(value));

thirdPromise
  .then((value) => handleSuccess(value))
  .catch((value) => handleError(value));
