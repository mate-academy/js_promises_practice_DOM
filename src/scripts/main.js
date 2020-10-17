/* eslint-disable prefer-promise-reject-errors */
'use strict';

const LEFT_CLICK = 1;
const RIGTH_CLICK = 3;

let leftMouseClicked = false;
let rigthMouseClocked = false;

const addMessage = (message) => {
  document.querySelector('.message').innerHTML += message;
};

const checkedClik = (which) => {
  switch (which) {
    case LEFT_CLICK:
      leftMouseClicked = true;
      break;
    case RIGTH_CLICK:
      rigthMouseClocked = true;
      break;
    default:
      break;
  }
};

const errorMessage = (name) => {
  return `
    <p style="color: red;">
      "Error: ${name} promise was rejected!!!
    </p>
  `;
};

const successMessage = (name) => {
  return `
    <p>
      Success: ${name} promise was resolved!!!
    </p>
  `;
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (event) => {
    resolve(successMessage('First'));
    checkedClik(event.which);
  });

  setTimeout(() => {
    reject(errorMessage('First'));
  }, 5000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (event) => {
    checkedClik(event.which);

    if (event.which === 1 || event.which === 3) {
      resolve(successMessage('Second'));
    }

    setTimeout(() => {
      reject(errorMessage('Second'));
    }, 5000);
  });
});

const promise3 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    if (leftMouseClicked && rigthMouseClocked) {
      resolve(successMessage('Thrid'));
    }

    setTimeout(() => {
      reject(errorMessage('Thrid'));
    }, 5000);
  });
});

promise1
  .then(addMessage)
  .catch(addMessage);

promise2
  .then(addMessage)
  .catch(addMessage);

promise3
  .then(addMessage)
  .catch(addMessage);
