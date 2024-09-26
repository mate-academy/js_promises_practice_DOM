'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let clicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    clicked = true;

    if (rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (clicked) {
      resolve('Third promise was resolved');
    }
  });
});

const successCallback = (result) => {
  const message = `
    <div data-qa="notification" class="success">
      ${result}
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', message);
};

const failureCallback = (error) => {
  const message = `
    <div data-qa="notification" class="warning">
      ${error.message}
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', message);
};

promise1.then(successCallback, failureCallback);
promise2.then(successCallback, failureCallback);
promise3.then(successCallback, failureCallback);
