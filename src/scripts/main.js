'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(
    // eslint-disable-next-line prefer-promise-reject-errors
    () => reject('First promise was rejected'),
    3000,
  );

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    clearTimeout(timeoutId);
  });
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

function successHandler(text) {
  const message = document.createElement('div');

  message.textContent = text;
  message.setAttribute('data-qa', 'notification');
  message.classList.add('success');
  document.body.appendChild(message);
}

function errorHandler(text) {
  const message = document.createElement('div');

  message.textContent = text;
  message.setAttribute('data-qa', 'notification');
  message.classList.add('error');
  document.body.appendChild(message);
}

promise1.then(successHandler).catch(errorHandler);
promise2.then(successHandler).catch(errorHandler);
promise3.then(successHandler).catch(errorHandler);
