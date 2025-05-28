'use strict';

const mouseState = {
  leftPressed: false,
  rightPressed: false,
};

const firstPromise = new Promise((resolve, reject) => {
  const onClick = () => {
    clearTimeout(timer);
    resolve('First promise was resolved');
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('click', onClick);

  const timer = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
    document.removeEventListener('click', onClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    } else if (e.button === 2) {
      resolve('Second promise was resolved');
    }
    document.removeEventListener('mousedown', onClick);
  };

  document.addEventListener('mousedown', onClick);
});

const thirdPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0) {
      mouseState.leftPressed = true;
    }

    if (e.button === 2) {
      mouseState.rightPressed = true;
    }

    if (mouseState.leftPressed && mouseState.rightPressed) {
      document.removeEventListener('mousedown', onClick);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', onClick);
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
