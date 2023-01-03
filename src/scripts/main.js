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

const thirdPromise = new Promise(resolve => {
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', e => {
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

const onSuccess = result => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="message message-success">
      ${result}
    </div>
  `);
};

const onError = error => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="message message-warning">
      ${error}
    </div>
  `);
};

firstPromise.then(onSuccess, onError);

secondPromise.then(onSuccess);

thirdPromise.then(onSuccess);
