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

function createArrayWithPromises() {
  const resolverLeftClick = new Promise((resolve,) => {
    logo.addEventListener('click', () => {
      resolve();
    });
  });

  const resolverRightClick = new Promise((resolve) => {
    logo.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      resolve();
    });
  });

  return [resolverLeftClick, resolverRightClick];
}

function createSecondtPrommise() {
  const result = createArrayWithPromises();

  return Promise.race(result);
}

function createThirdPrommise() {
  const result = createArrayWithPromises();

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
