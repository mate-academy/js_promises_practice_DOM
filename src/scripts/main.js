'use strict';

const body = document.querySelector('body');
const messageResolved = 'Promise was resolved!';
const messageRejected = 'Promise was rejected!';

function insertSuccesMessage() {
  return body.insertAdjacentHTML('beforeend', `<div data-qa="notification"
  class="message succes">
    ${messageResolved}
  </div>`);
};

function insertWarningMessage() {
  return body.insertAdjacentHTML('beforeend', `<div data-qa="notification"
  class="message warning">
    ${messageRejected}
  </div>`);
};

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(Error);
  }, 3000);
});

firstPromise
  .then(() => {
    insertSuccesMessage();
  })

  .catch(() => {
    insertWarningMessage();
  });

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

secondPromise.then(() => {
  insertSuccesMessage();
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    };

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve();
    }
  });
});

thirdPromise.then(() => {
  insertSuccesMessage();
});
