'use strict';

const pushNotification = (type, message) => {
  const n = document.createElement('div');

  n.dataset.qa = 'notification';
  n.classList.add(type);

  const p = document.createElement('p');

  p.textContent = message;
  n.appendChild(p);
  document.body.appendChild(n);
};

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

firstPromise
  .then((message) => {
    pushNotification('success', message);
  })
  .catch((error) => {
    pushNotification('error', error.message);
  });

document.addEventListener('contextmenu', (e) => e.preventDefault());

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

secondPromise.then((message) => {
  pushNotification('success', message);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

thirdPromise.then((message) => {
  pushNotification('success', message);
});
