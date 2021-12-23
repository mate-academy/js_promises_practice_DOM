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
  const handler = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

const thirdPromise = new Promise((resolve) => {
  let count = 0;
  let lastEvent;

  const handler = (e) => {
    if (e.type !== lastEvent) {
      lastEvent = e.type;
      count++;
    }

    if (count === 2) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

function successHandler(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('message', 'success');

  if (message.includes('Second')) {
    div.classList.add('message--second');
  }

  if (message.includes('Third')) {
    div.classList.add('message--third');
  }

  div.textContent = message;

  document.body.append(div);
}

function errorHandler(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('message', 'error-message', 'warning');
  div.textContent = message;

  document.body.append(div);
}

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
