/* eslint-disable no-console */
'use strict';

const getFirstPromise = () => {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', () => resolve('first promise success'));
    setTimeout(() => reject(new Error('first promise fail')), 5000);
  });
};

const getSecondPromise = () => {
  return new Promise((resolve, reject) => {
    document.addEventListener('mousedown', (e) => {
      if (e.buttons === 1 || e.buttons === 2) {
        resolve('second promise success');
      }
    });
  });
};

const getThirdPromise = () => {
  return new Promise((resolve, reject) => {
    const events = ['left', 'right'];

    document.addEventListener('mousedown', (e) => {
      if (e.buttons === 1) {
        const left = events.findIndex((item) => item === 'left');

        events.splice(left, 1);
      }

      if (e.buttons === 2) {
        const right = events.findIndex((item) => item === 'right');

        events.splice(right, 1);
      }

      if (events.length === 0) {
        resolve('third promise success');
      }
    });
  });
};

const first = getFirstPromise();
const second = getSecondPromise();
const third = getThirdPromise();

first.then((res) => console.log(res)).catch((err) => console.warn(err));
second.then((res) => console.log(res));
third.then((res) => console.log(res));
