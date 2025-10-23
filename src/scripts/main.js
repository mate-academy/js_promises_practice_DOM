'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      clearTimeout(timer);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const promise3 = new Promise((resolve) => {
  let rightClicked = false;
  let leftClicked = false;
  const tryResolve = () => {
    if (rightClicked && leftClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      rightClicked = true;
      tryResolve();
    },
    { once: true },
  );

  document.addEventListener(
    'click',
    () => {
      leftClicked = true;
      tryResolve();
    },
    { once: true },
  );
});

promise1
  .then((message) => createMessage(message))
  .catch((message) => createMessage(message, true));

promise2.then((message) => createMessage(message));

promise3.then((message) => createMessage(message));

function createMessage(message, error = false) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class=${error ? 'error' : 'success'}>${message}</div>`,
  );
}
