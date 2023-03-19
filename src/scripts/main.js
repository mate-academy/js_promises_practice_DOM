'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });

  if (reject) {

  }
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then(onSuccess)
  .catch(onError);

secondPromise
  .then(onSuccess);

thirdPromise
  .then(onSuccess);

function onSuccess(result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification">
      ${result}
    </div>
  `);
};

function onError() {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification"></div>
  `);
};
