/* eslint-disable prefer-promise-reject-errors */
'use strict';

const LEFT_CLICK = 1;
const RIGTH_CLICK = 3;

const addMessage = (message) => {
  document.querySelector('.message').innerHTML += message;
};

const checkedClik = (which, click) => {
  switch (which) {
    case LEFT_CLICK:
      click.left = true;
      break;
    case RIGTH_CLICK:
      click.rigth = true;
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
  });

  setTimeout(() => {
    reject(errorMessage('First'));
  }, 5000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (event) => {
    if (event.which === LEFT_CLICK || event.which === RIGTH_CLICK) {
      resolve(successMessage('Second'));
    }

    setTimeout(() => {
      reject(errorMessage('Second'));
    }, 5000);
  });
});

const promise3 = new Promise((resolve, reject) => {
  const clickMouse = {
    left: false,
    rigth: false,
  };

  document.addEventListener('mousedown', (event) => {
    checkedClik(event.which, clickMouse);

    if (clickMouse.left && clickMouse.rigth) {
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
