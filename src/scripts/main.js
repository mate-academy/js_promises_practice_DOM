'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 5000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Left button was click');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Right button was click');
  });
});

const promise3 = new Promise((resolve) => {
  let mouseEvent = [0, 2];

  body.addEventListener('mousedown', (e) => {
    mouseEvent = mouseEvent.filter(click => click === e.button);

    if (mouseEvent.length === 0) {
      resolve('Both buttons were clicked');
    }
  });
});

promise1
  .then((result) => {
    // eslint-disable-next-line no-console
    console.log(result);
  }, (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

promise2
  .then(result => {
    // eslint-disable-next-line no-console
    console.log(result);
  });

promise3
  .then(result => {
    // eslint-disable-next-line no-console
    console.log(result);
  });
