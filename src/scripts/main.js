'use strict';

const createSuccessMessage = (count) => {
  const message = document.createElement('div');

  message.classList.add('success');
  message.setAttribute('data-qa', 'notification');
  message.textContent = `${count} promise was resolved`;

  return message;
};

const createErrorMessage = (count) => {
  const errorMessage = document.createElement('div');

  errorMessage.classList.add('error');
  errorMessage.setAttribute('data-qa', 'notification');
  errorMessage.textContent = `${count} promise was rejected`;

  return errorMessage;
};

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      document.removeEventListener('click', onClick);
      clearTimeout(rejectTimer);
      resolve('First');
    }
  };

  document.addEventListener('click', onClick);

  const rejectTimer = setTimeout(() => {
    document.removeEventListener('click', onClick);
    reject(new Error('First'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const onMouseDown = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', onMouseDown);
      resolve('Second');
    }
  };

  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('mousedown', onMouseDown);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const onMouseDown = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', onMouseDown);
      resolve('Third');
    }
  };

  document.addEventListener('mousedown', onMouseDown);

  document.addEventListener('contextmenu', (e) => e.preventDefault());
});

firstPromise
  .then((msg) => document.body.append(createSuccessMessage(msg)))
  .catch((msg) => document.body.append(createErrorMessage(msg)));

secondPromise
  .then((msg) => document.body.append(createSuccessMessage(msg)))
  .catch((msg) => document.body.append(createErrorMessage(msg)));

thirdPromise
  .then((msg) => document.body.append(createSuccessMessage(msg)))
  .catch((msg) => document.body.append(createErrorMessage(msg)));
