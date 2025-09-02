'use strict';

const notification = (type, text) => {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = text;

  body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const idleTimer = setTimeout(() => reject(Error), 3000);

  document.addEventListener(
    'click',
    (e) => {
      clearTimeout(idleTimer);

      if (e.button === 0) {
        resolve();
      } else {
        setTimeout(() => reject(Error), 3000);
      }
    },
    { once: true },
  );
});

firstPromise
  .then(() => notification('success', 'First promise was resolved'))
  .catch(() => notification('error', 'First promise was rejected'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    resolve();
  });
});

secondPromise.finally(() => {
  notification('success', 'Second promise was resolved');
});

// THIRD PROMISE
let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const check = () => {
    if (leftClicked && rightClicked) {
      resolve();
    }
  };

  document.addEventListener(
    'click',
    () => {
      leftClicked = true;
      check();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      rightClicked = true;
      check();
    },
    { once: true },
  );
});

thirdPromise.then(() => {
  notification('success', 'Third promise was resolved');
});
