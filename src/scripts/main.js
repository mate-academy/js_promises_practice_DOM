'use strict';

function firstPromise() {
  return new Promise((resolve, reject) => {
    document.body.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    document.body.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    document.body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    });
  });
}

function thirdPromise() {
  return new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    const checkClicks = () => {
      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    };

    document.body.addEventListener('click', () => {
      leftClicked = true;
      checkClicks();
    });

    document.body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      rightClicked = true;
      checkClicks();
    });
  });
}

function addNotification(message, isError = false) {
  const className = isError ? 'error' : 'success';

  document.body.insertAdjacentHTML(
    'beforebegin',
    `<div data-qa="notification" class="${className}">${message}</div>`,
  );
}

document.addEventListener('DOMContentLoaded', () => {
  firstPromise()
    .then((message) => addNotification(message))
    .catch((error) => addNotification(error.message, true));

  secondPromise().then((message) => addNotification(message));
  thirdPromise().then((message) => addNotification(message));
});
