'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      clearTimeout(timer);
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);

  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', clickHandler);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

const rightClickPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 2) {
      resolve('Right click done');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

const leftClickPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0) {
      resolve('Right click done');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise])

  .then(() => 'Third promise was resolved');

function showNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type;
  div.textContent = message;
  document.body.append(div);
}

const promises = [
  { p: firstPromise, name: 'First' },
  { p: secondPromise, name: 'Second' },
  { p: thirdPromise, name: 'Third' },
];

promises.forEach((item) => {
  item.p
    .then((msg) => showNotification(msg, 'success'))
    .catch((err) => showNotification(err.message || err, 'error'));
});
