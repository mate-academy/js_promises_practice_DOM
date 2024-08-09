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

function handler(className, text) {
  const element = document.createElement('div');

  element.dataset.qa = 'notification';
  element.className = className;
  element.textContent = text;
  document.body.append(element);
}

getFirstPromise()
  .then((data) => handler('success', `${data} promise was resolved`))
  .catch((data) => handler('error', `${data} promise was rejected`));

getSecondPromise()
  .then((data) => handler('success', `${data} promise was resolved`))
  .catch((data) => handler('error', `${data} promise was rejected`));

getThirdPromise()
  .then((data) => handler('success', `${data} promise was resolved`))
  .catch((data) => handler('error', `${data} promise was rejected`));
