'use strict';

function getFirstPromise() {
  return new Promise((resolve, reject) => {
    const body = document.querySelector('body');

    body.addEventListener('click', (e) => {
      if (e.target.closest('body')) {
        resolve('First');
      }
    });

    setTimeout(() => {
      const err = 'First';

      reject(err);
    }, 3000);
  });
}

function getSecondPromise() {
  return new Promise((resolve, reject) => {
    const body = document.querySelector('body');

    body.addEventListener('mouseup', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second');
      }
    });
  });
}

function getThirdPromise() {
  return new Promise((resolve, reject) => {
    const body = document.querySelector('body');
    let lastButton = null;

    body.addEventListener('mouseup', (e) => {
      if (lastButton === null) {
        lastButton = e.button;
      }

      if (lastButton !== e.button && (e.button === 2 || e.button === 0)) {
        resolve('Third');
      }
    });
  });
}

function successHandler(result) {
  const element = document.createElement('div');

  element.dataset.qa = 'notification';
  element.className = 'success';
  element.textContent = `${result} promise was resolved`;
  document.body.append(element);
}

function errorHandler(result) {
  const element = document.createElement('div');

  element.dataset.qa = 'notification';
  element.className = 'error';
  element.textContent = `${result} promise was rejected`;
  document.body.append(element);
}

getFirstPromise().then(successHandler).catch(errorHandler);
getSecondPromise().then(successHandler).catch(errorHandler);
getThirdPromise().then(successHandler).catch(errorHandler);
