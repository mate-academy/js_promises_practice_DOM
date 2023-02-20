'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let flag = false;

  document.documentElement.addEventListener('click', () => {
    flag = true;
    resolve('First promise was resolved');
  });

  if (!flag) {
    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  }
});

const secondPromise = new Promise(resolve => {
  document.documentElement.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.documentElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.documentElement.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const succesHandler = (result) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${result}
    </div>
  `);
};

const errorHandler = (error) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${error}
    </div>
  `);
};

firstPromise
  .then(succesHandler)
  .catch(errorHandler);

secondPromise.then(succesHandler);

thirdPromise.then(succesHandler);
