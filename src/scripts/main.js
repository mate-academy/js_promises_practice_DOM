'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick;
  let rightClick;

  document.addEventListener(
    'click',
    () => {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      rightClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );
});

function success(message) {
  const div = document.createElement('div');

  div.className = 'success';
  div.dataset.qa = 'notification';
  div.innerText = message;

  document.body.appendChild(div);
}

function error(message) {
  const div = document.createElement('div');

  div.className = 'error';
  div.dataset.qa = 'notification';
  div.innerText = message;

  document.body.appendChild(div);
}

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
