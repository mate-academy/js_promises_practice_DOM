'use strict';

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    document.body.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });
};

const secondPromise = () => {
  return new Promise((resolve) => {
    document.body.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    document.body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    });
  });
};

const thirdPromise = () => {
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
};

document.addEventListener('DOMContentLoaded', () => {
  firstPromise()
    .then((message) => {
      document.body.insertAdjacentHTML(
        'beforebegin',
        `<div data-qa="notification" class="success">${message}</div>`,
      );
    })
    .catch((error) => {
      document.body.insertAdjacentHTML(
        'beforebegin',
        `<div data-qa="notification" class="error">${error.message}</div>`,
      );
    });

  secondPromise().then((message) => {
    document.body.insertAdjacentHTML(
      'beforebegin',
      `<div data-qa="notification" class="success">${message}</div>`,
    );
  });

  thirdPromise().then((message) => {
    document.body.insertAdjacentHTML(
      'beforebegin',
      `<div data-qa="notification" class="success">${message}</div>`,
    );
  });
});
