'use strict';

const body = document.body;

const message = (type, text) => {
  const div = `<div data-qa="notification" class="${type}">${text}</div>`;

  body.insertAdjacentHTML('beforeend', div);
};

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    document.body.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });
};

const secondPromise = () => {
  return new Promise((resolve) => {
    document.body.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    });
  });
};

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked;
  let isRightClicked;

  document.body.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      isLeftClicked = true;
    };

    if (click.button === 2) {
      isRightClicked = true;
    };

    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise()
  .then(result => {
    message('success', result);
  })
  .catch(error => {
    message('warning', error);
  });

secondPromise()
  .then(result => {
    message('success2', result);
  });

thirdPromise()
  .then(result => {
    message('success2', result);
  });
