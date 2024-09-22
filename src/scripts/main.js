'use strict';

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  logo.addEventListener('click', () => {
    clearTimeout(timeout);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;
    checkBoth();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
    checkBoth();
  });

  function checkBoth() {
    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  }
});

function actionOnClick(stat, message) {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.className = stat;
  newDiv.innerHTML = message;

  document.body.appendChild(newDiv);
}

firstPromise
  .then((message) => {
    actionOnClick('success', message);
  })
  .catch((err) => {
    actionOnClick('error', err);
  });

secondPromise.then((message) => {
  actionOnClick('success', message);
});

thirdPromise.then((msg) => {
  actionOnClick('success', msg);
});
