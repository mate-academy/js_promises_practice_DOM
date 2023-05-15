'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');

    setTimeout(() => {
      reject(addError);
    }, 3000);
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });
});

function addSuccess(notification) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
    ${notification}
    </div>
  `);
}

function addError(notification) {
  document.body.insertAdjacentHTML('beforeend', `
  <div class="warning" data-qa="notification">
      ${notification}
    </div>
  `);
}

firstPromise
  .then(addSuccess)
  .catch(addError);

secondPromise
  .then(addSuccess)
  .catch(addError);

thirdPromise
  .then(addSuccess)
  .catch(addError);
