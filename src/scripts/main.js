'use strict';

const body = document.body;

function applyPromises(promise) {
  promise
    .then(data => {
      body.insertAdjacentHTML(
        'beforeend',
        `<div class="success" data-qa="notification">${data}</div>`,
      );
    })
    .catch(data => {
      body.insertAdjacentHTML(
        'beforeend',
        `<div class="warning" data-qa="notification">${data}</div>`,
      );
    });
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function isClicked() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      leftClick = false;
      rightClick = false;
    }
  }

  document.addEventListener('click', () => {
    leftClick = true;

    isClicked();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    isClicked();
  });
});

applyPromises(firstPromise);
applyPromises(secondPromise);
applyPromises(thirdPromise);
