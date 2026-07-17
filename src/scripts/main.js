'use strict';

let rightClick = false;
let leftClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (even) => {
    if (even.button !== 0) {
      return;
    }
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (even) => {
    if (even.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (even) => {
    even.preventDefault();
    resolve('Second promise was resolved');
  });
});
const thirdPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (even) => {
    if (even.button === 2) {
      rightClick = true;
    }

    checkForBoth();
  });

  document.addEventListener('click', (even) => {
    if (even.button === 0) {
      leftClick = true;
    }

    checkForBoth();
  });

  function checkForBoth() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  }
});

const sucessMsg = (message) => {
  const div = document.createElement('div');

  div.className = 'success';
  div.textContent = message;
  div.dataset.qa = 'notification';
  document.body.append(div);
};

const errorMsg = (error) => {
  const div = document.createElement('div');

  div.className = 'error';
  div.textContent = error;
  div.dataset.qa = 'notification';
  document.body.append(div);
};

firstPromise.then(sucessMsg).catch(errorMsg);
secondPromise.then(sucessMsg).catch(errorMsg);
thirdPromise.then(sucessMsg).catch(errorMsg);
