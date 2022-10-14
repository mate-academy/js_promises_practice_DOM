'use strict';

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', (e) => {
    resolve('first promise');
  });

  setTimeout(() => {
    reject(new Error('error'));
  }, 5000);
});

const secondPromise = new Promise(resolve => {
  logo.onmousedown = e => {
    if (e.which === 1 || e.which === 3) {
      resolve('second promise');
    }
  };
});

const thirdPromise = new Promise(resolve => {
  const clicks = ['left', 'right'];

  logo.onmousedown = e => {
    if (e.which === 1) {
      const left = clicks.findIndex((click) => click === 'left');

      clicks.splice(left, 1);
    }

    if (e.which === 2) {
      const right = clicks.findIndex((click) => click === 'right');

      clicks.splice(right, 1);
    }

    if (clicks.length === 0) {
      resolve('third promise');
    }
  };
});

firstPromise
  // eslint-disable-next-line no-console
  .then(result => console.log('succes', result))
  // eslint-disable-next-line no-console
  .catch(error => console.log('error', error));

secondPromise
  // eslint-disable-next-line no-console
  .then(result => console.log('succes', result));

thirdPromise
  // eslint-disable-next-line no-console
  .then(result => console.log('succes', result));
