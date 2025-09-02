'use strict';

const notification = (type, text) => {
  const body = document.querySelector('body');

  let el = document.querySelector('[data-qa="notification"]');

  if (!el) {
    el = document.createElement('div');
    el.dataset.qa = 'notification';
    body.appendChild(el);
  }

  el.className = type;
  el.textContent = text;
};

const firstPromise = new Promise((resolve, reject) => {
  const idleTimer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(idleTimer);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

firstPromise
  .then((msg) => notification('success', msg))
  .catch((msg) => notification('error', msg));

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
