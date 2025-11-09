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

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const onMouseDown = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', onMouseDown);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

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
