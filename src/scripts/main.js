'use strict';

const logo = document.querySelector('.logo');

function createFirstPrommise() {
  return new Promise((resolve, reject) => {
    logo.addEventListener('click', () => {
      resolve();
    });

    setTimeout(() => {
      reject(error);
    }, 3000);
  });
}

function f() {
  const p1 = new Promise((resolve,) => {
    logo.addEventListener('click', () => {
      resolve();
    });
  });

  const p2 = new Promise((resolve) => {
    logo.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      resolve();
    });
  });

  return [p1, p2];
}

function createSecondtPrommise() {
  const result = f();

  return Promise.race(result);
}

function createThirdPrommise() {
  const result = f();

  return Promise.all(result);
};

const firstPromise = createFirstPrommise();

firstPromise.then(() => {
  success('First promise was resolved');

  return createSecondtPrommise();
})
  .then(() => {
    success('Second promise was resolved');

    return createThirdPrommise();
  })
  .then(() => {
    success('Third promise was resolved');
  })
  .catch(error);

function success(message) {
  document.body.insertAdjacentHTML('beforeend', `
        <div data-qa="notification" class="success">
          ${message}
        </div>
    `);
}

function error() {
  document.body.insertAdjacentHTML('beforeend', `
        <div data-qa="notification" class="error">
          First promise was rejected
        </div>
    `);
}
