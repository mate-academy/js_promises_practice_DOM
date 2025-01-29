'use strict';

const entireDocument = document.body;

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  entireDocument.addEventListener('click', () => {
    clicked = true;
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected!'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  entireDocument.addEventListener('click', () => {
    resolve('Second promise was resolved!');
  });

  entireDocument.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved!');
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  entireDocument.addEventListener('click', () => {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved!');
    }
  });

  entireDocument.addEventListener('contextmenu', () => {
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved!');
    }
  });
});

firstPromise
  .then((message) => {
    successHandler(message);
  })
  .catch((message) => {
    errorHandler(message);
  });

secondPromise.then((message) => {
  successHandler(message);
});

thirdPromise.then((message) => {
  successHandler(message);
});

function successHandler(message) {
  const a = document.createElement('div');

  a.setAttribute('data-qa', 'notification');
  a.className = 'success';
  a.textContent = message;

  document.body.append(a);
}

function errorHandler(message) {
  const a = document.createElement('div');

  a.setAttribute('data-qa', 'notification');
  a.className = 'error';
  a.textContent = message;

  document.body.append(a);
}
