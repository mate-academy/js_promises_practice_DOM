'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((text) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">${text}</div>`,
    );
  })
  .catch((error) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">${error}</div>`,
    );
  });

secondPromise.then((text) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="success">${text}</div>`,
  );
});

thirdPromise.then((text) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="success">${text}</div>`,
  );
});
