'use strict';

const root = document.querySelector('body');
const doc = document.querySelector('html');
const success = (nth) => {
  return `<div class="success" data-qa="notification">` +
    `${nth} promise was resolved</div>`;
};
const error = `<div class="warning" data-qa="notification">` +
  `First promise was rejected</div>`;

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    doc.addEventListener('mousedown', () => {
      resolve(success('First'));
    });

    setTimeout(() => {
      reject(error);
    }, 3000);
  });
};

const secondPromise = () => {
  return new Promise((resolve) => {
    doc.addEventListener('mousedown', (ev) => {
      if (ev.button === 0 || ev.button === 2) {
        resolve(success('Second'));
      };
    });
  });
};

const thirdPromise = () => {
  return new Promise((resolve) => {
    doc.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        doc.addEventListener('mousedown', (ev) => {
          if (ev.button === 2) {
            resolve(success('Third'));
          }
        });
      }

      if (e.button === 2) {
        doc.addEventListener('mousedown', (ev) => {
          if (ev.button === 0) {
            resolve(success('Third'));
          }
        });
      }
    });
  });
};

firstPromise()
  .then(result => root.insertAdjacentHTML('beforeend', result))
  .catch(err => root.insertAdjacentHTML('beforeend', err));

secondPromise()
  .then(result => root.insertAdjacentHTML('beforeend', result));

thirdPromise()
  .then(result => root.insertAdjacentHTML('beforeend', result));
