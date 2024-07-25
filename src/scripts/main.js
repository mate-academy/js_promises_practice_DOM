'use strict';

function createElementDiv(message, isSuccess) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;

  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timer);
    resolve('First promise was resolved on a left click in the document');
  });
});

firstPromise
  .then((message) => createElementDiv(message, true))
  .catch((message) => createElementDiv(message, false));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => createElementDiv(message, true));

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve(
        'Third promise was resolved only after both left\n' +
          'and right clicks happened',
      );
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve(
        'Third promise was resolved only after both left\n' +
          'and right clicks happened',
      );
    }
  });
});

thirdPromise.then((message) => createElementDiv(message, true));
