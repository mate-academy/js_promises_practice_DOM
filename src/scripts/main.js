'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', function() {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promiseHandler = (className, message) => {
  const div = document.createElement('div');

  div.classList.add(className);
  div.setAttribute('data-qa', 'notification');
  div.innerText = message;
  document.body.append(div);
};

firstPromise
  .then((message) => {
    promiseHandler('success', message);
  })
  .catch(({ message }) => {
    promiseHandler('warning', message);
  });

const secondPromise = new Promise((resolve, reject) => {
  ['click', 'contextmenu'].forEach(eventType => {
    document.addEventListener(eventType, () =>
      resolve('Second promise was resolved'));
  });
});

secondPromise
  .then((message) => {
    promiseHandler('success', message);
  })
  .catch(({ message }) => {
    promiseHandler('warning', message);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.addEventListener('click', () => {
    isLeftClicked = true;

    if (isRightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    isRightClicked = true;

    if (isLeftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((message) => {
    promiseHandler('success', message);
  })
  .catch((error) => {
    promiseHandler('warning', error.message);
  });
