'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const msg = document.createElement('div');

  msg.dataset.qa = 'notification';

  document.addEventListener('click', () => {
    resolve(msg);
  });

  setTimeout(() => {
    reject(msg);
  }, 3000);
});

firstPromise.then(
  function (msg) {
    msg.classList.add('success');
    msg.textContent = 'First promise was resolved';
    document.body.appendChild(msg);
  },
  function (msg) {
    msg.classList.add('error');
    msg.textContent = 'First promise was rejected';
    document.body.appendChild(msg);
  },
);

const secondPromise = new Promise((resolve) => {
  const msg = document.createElement('div');

  msg.dataset.qa = 'notification';

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(msg);
  });

  document.addEventListener('click', () => {
    resolve(msg);
  });
});

secondPromise.then((msg) => {
  msg.dataset.qa = 'notification';
  msg.classList.add('success');
  msg.textContent = 'Second promise was resolved';
  document.body.appendChild(msg);
});

const thirdPromise = new Promise((resolve) => {
  const pressedKeys = new Set();
  const msg = document.createElement('div');

  msg.dataset.qa = 'notification';

  document.addEventListener('mousedown', (e) => {
    pressedKeys.add(e.button);

    if (pressedKeys.has(0) && pressedKeys.has(2)) {
      resolve(msg);
    }
  });
});

thirdPromise.then((msg) => {
  msg.dataset.qa = 'notification';
  msg.classList.add('success');
  msg.textContent = 'Third promise was resolved';
  document.body.appendChild(msg);
});
