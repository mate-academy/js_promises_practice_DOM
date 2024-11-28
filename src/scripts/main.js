'use strict';

let promiseNumber;
let firstCheck = false;
let secondCheck = false;

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    promiseNumber = 1;
    resolve();
  });

  setTimeout(() => {
    reject();
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    promiseNumber = 2;
    resolve();
  });

  document.addEventListener('contextmenu', (eve) => {
    eve.preventDefault();
    promiseNumber = 2;
    resolve();
  });
});

const promise3 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    firstCheck = true;

    if (firstCheck && secondCheck) {
      promiseNumber = 3;
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    secondCheck = true;

    if (firstCheck && secondCheck) {
      promiseNumber = 3;
      resolve();
    }
  });
});

const promiseDone = () => {
  const successMessage = document.createElement('div');

  successMessage.className = 'success';
  successMessage.setAttribute('data-qa', 'notification');

  switch (promiseNumber) {
    case 1:
      successMessage.textContent = 'First promise was resolved';
      break;
    case 2:
      successMessage.textContent = 'Second promise was resolved';
      break;
    case 3:
      successMessage.textContent = 'Third promise was resolved';
      break;
  }
  document.body.appendChild(successMessage);
};

const promiseFailed = () => {
  const failedMessage = document.createElement('div');

  failedMessage.className = 'error';
  failedMessage.setAttribute('data-qa', 'notification');
  failedMessage.textContent = 'First promise was rejected';
  document.body.appendChild(failedMessage);
};

promise1

  .then(promiseDone)

  .catch(promiseFailed);

promise2.then(promiseDone);

promise3.then(promiseDone);
