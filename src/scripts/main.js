'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const onSuccess = result => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${result}
    </div>
  `);
};

const onError = error => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${error}
    </div>
  `);
};

firstPromise.then(onSuccess, onError);

secondPromise.then(onSuccess);

thirdPromise.then(onSuccess);
