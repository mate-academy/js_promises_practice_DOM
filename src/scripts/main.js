'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    };
  });

  document.addEventListener('contextmenu', (e) => {
    rightClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    };
  });
});

const successHandler = data => {
  body.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
      ${data}
    </div>
  `);
};

const errorHandler = data => {
  body.insertAdjacentHTML('beforeend', `
    <div class="warning" data-qa="notification">
      ${data}
    </div>
  `);
};

promise1
  .then(successHandler)
  .catch(errorHandler);

promise2
  .then(successHandler)
  .catch(errorHandler);

promise3
  .then(successHandler)
  .catch(errorHandler);
