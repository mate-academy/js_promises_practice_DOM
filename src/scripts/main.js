'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (even) => {
    even.preventDefault();

    if (even.button === 0) {
      clearTimeout(timeoutFirstPromise);
      resolve('First promise was resolved');
    }
  });

  const timeoutFirstPromise = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    const succes = document.createElement('div');

    succes.setAttribute('class', 'success');
    succes.setAttribute('data-qa', 'notification');
    succes.textContent = message;

    body.append(succes);
  })
  .catch((message) => {
    const error = document.createElement('div');

    error.setAttribute('class', 'error');
    error.setAttribute('data-qa', 'notification');
    error.textContent = message.message;

    body.append(error);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (even) => {
    even.preventDefault();
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (even) => {
    even.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((message) => {
    const succes = document.createElement('div');

    succes.setAttribute('class', 'success');
    succes.setAttribute('data-qa', 'notification');
    succes.textContent = message;

    body.append(succes);
  })

  .catch((message) => {
    const error = document.createElement('div');

    error.setAttribute('class', 'error');
    error.setAttribute('data-qa', 'notification');
    error.textContent = message;

    body.append(error);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let counterLeft = false;
  let counterRight = false;

  function check() {
    if (counterLeft && counterRight) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', (even) => {
    if (even.button === 0) {
      even.preventDefault();
      counterLeft = true;
      check();
    }
  });

  document.addEventListener('contextmenu', (even) => {
    even.preventDefault();
    counterRight = true;
    check();
  });
});

thirdPromise
  .then((message) => {
    const success = document.createElement('div');

    success.setAttribute('class', 'success');
    success.setAttribute('data-qa', 'notification');
    success.textContent = message;

    body.append(success);
  })

  .catch((message) => {
    const error = document.createElement('div');

    error.setAttribute('class', 'error');
    error.setAttribute('data-qa', 'notification');
    error.textContent = message;

    body.append(error);
  });
