'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirtPromise = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.innerText = message;
    document.body.appendChild(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.innerText = error.message;
    document.body.appendChild(div);
  },
);

secondPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.innerText = message;
    document.body.appendChild(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.innerText = error.message;
    document.body.appendChild(div);
  },
);

thirtPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.innerText = message;
    document.body.appendChild(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.innerText = error.message;
    document.body.appendChild(div);
  },
);
