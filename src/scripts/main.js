'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const onDown = (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', onDown, { once: true });

  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

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

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0) {
        resolve('Third promise left click resolved');
      }
    },
    { once: true },
  );
});
const rightClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 2) {
        resolve('Third promise right click resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise]).then(
  () => 'Third promise was resolved',
);

firstPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.className = 'notification success';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.className = 'notification error';
    div.dataset.qa = 'notification';
    div.textContent = error.message;
    document.body.append(div);
  },
);

secondPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.className = 'notification success';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.className = 'notification error';
    div.dataset.qa = 'notification';
    div.textContent = error.message;
    document.body.append(div);
  },
);

thirdPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.className = 'notification success';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.className = 'notification error';
    div.dataset.qa = 'notification';
    div.textContent = error.message;
    document.body.append(div);
  },
);
