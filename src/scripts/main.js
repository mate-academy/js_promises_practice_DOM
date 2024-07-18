'use strict';

const body = document.body;
let LEFT_BUTTON = false;
let RIGHT_BUTTON = false;

document.addEventListener('contextmenu', (e) => e.preventDefault());

const success = (message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.dataset.qa = 'notification';
  div.innerText = message;

  body.appendChild(div);
};

const error = (message) => {
  const div = document.createElement('div');

  div.classList.add('error');
  div.dataset.qa = 'notification';
  div.innerText = message;

  body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    clearInterval();
  });

  setInterval(reject, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if ((e.buttons & 1) === 1) {
      LEFT_BUTTON = true;
    }

    if ((e.buttons & 2) === 2) {
      RIGHT_BUTTON = true;
    }

    if (LEFT_BUTTON && RIGHT_BUTTON) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(success).catch(() => error('First promise was rejected'));

secondPromise.then(success);

thirdPromise.then(success);
