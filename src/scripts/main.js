'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.className = 'success';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  })
  .catch((message) => {
    const div = document.createElement('div');

    div.className = 'warning';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then((message) => {
    const div = document.createElement('div');

    div.className = 'success';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    };
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    };
  });
});

thirdPromise
  .then((message) => {
    const div = document.createElement('div');

    div.className = 'success';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  });
