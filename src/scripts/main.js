'use strict';

const body = document.querySelector('body');

const successHandler = (promiseNumber) => {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = `${promiseNumber} promise was resolved`;

  body.append(div);
};

const errorHandler = (promiseNumber) => {
  const div = document.createElement('div');

  div.className = 'error';
  div.setAttribute('data-qa', 'notification');
  div.textContent = `${promiseNumber} promise was rejected`;

  body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First');
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    const firstMouseButton = e.button;

    if (firstMouseButton === 0 || firstMouseButton === 2) {
      document.addEventListener('mousedown', (ev) => {
        const secondMouseButton = ev.button;

        if (firstMouseButton !== secondMouseButton && secondMouseButton !== 1) {
          resolve('Third');
        }
      });
    }
  });
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
