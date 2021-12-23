'use strict';

const success = document.createElement('div');
const warning = document.createElement('div');
const body = document.querySelector('body');

success.className = 'success';
success.dataset.qa = 'notification';
warning.className = 'warning';
warning.dataset.qa = 'notification';

function firstPromise() {
  return new Promise((resolve, reject) => {
    const firstSuccess = success.cloneNode(true);
    const firstWarning = warning.cloneNode(true);

    firstSuccess.innerText = 'First promise was resolved';
    firstWarning.innerText = 'First promise was rejected';

    setTimeout(() => reject(firstWarning), 2900);

    document.addEventListener('mousedown', event => {
      switch (event.button) {
        case 0:
        case 1:
        case 2:
          resolve(firstSuccess);
      }
    });
  });
}

function secondPromise() {
  return new Promise(resolve => {
    const secondSuccess = success.cloneNode(true);

    secondSuccess.innerText = 'Second promise was resolved';

    document.addEventListener('mousedown', event => {
      switch (event.button) {
        case 0:
        case 2:
          resolve(secondSuccess);
      }
    });
  });
}

function thirdPromise() {
  return new Promise(resolve => {
    const thirdSuccess = success.cloneNode(true);

    let condition1 = false;
    let condition2 = false;

    thirdSuccess.innerText = 'Third promise was resolved';

    document.addEventListener('mousedown', event => {
      switch (event.button) {
        case 0:
          condition1 = true;
          break;
        case 2:
          condition2 = true;
          break;
      }

      if (condition1 && condition2) {
        resolve(thirdSuccess);
      }
    });
  });
}

firstPromise()
  .then(result => body.append(result))
  .catch(error => body.append(error));

secondPromise()
  .then(result => body.append(result))
  .catch(error => body.append(error));

thirdPromise()
  .then(result => body.append(result))
  .catch(error => body.append(error));
