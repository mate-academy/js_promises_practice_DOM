'use strict';

function message(className, text) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList = className;
  div.textContent = text;

  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
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

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    message('success', 'First promise was resolved');
  })
  .catch(() => {
    message('warning', 'First promise was rejected');
  });

secondPromise
  .then(() => {
    message('success', 'Second promise was resolved');
  });

thirdPromise
  .then(() => {
    message('success', 'Third promise was resolved');
  });
