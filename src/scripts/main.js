'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = () => {
    reject(new Error('First promise was rejected'));
  };

  document.addEventListener('click', () => {
    resolve();
    clearTimeout(timerId);
  });

  setTimeout(timerId, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise(resolve => {
  let isClickedLeft = false;
  let isClickedRight = false;

  document.addEventListener('click', () => {
    isClickedLeft = true;

    if (isClickedLeft && isClickedRight) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isClickedRight = true;

    if (isClickedLeft && isClickedRight) {
      resolve();
    }
  });
});

const createMessage = (text, state) => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add(state);
  message.innerText = text;

  document.body.append(message);
};

firstPromise
  .then(() => {
    createMessage(
      'First promise was resolved',
      'success',
    );
  })
  .catch(() => {
    createMessage(
      'First promise was rejected',
      'warning',
    );
  });

secondPromise
  .then(() => {
    createMessage(
      'Second promise was resolved',
      'success',
    );
  });

thirdPromise
  .then(() => {
    createMessage(
      'Third promise was resolved',
      'success',
    );
  });
