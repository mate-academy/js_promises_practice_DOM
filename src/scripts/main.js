'use strict';

document.addEventListener('contextmenu', (ev) => {
  ev.preventDefault();
});

const first = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const second = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let leftClick = false;
let rightClick = false;

const third = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function handlePromise(promise) {
  promise
    .then((message) => {
      const div = document.createElement('div');

      div.classList.add('success');
      div.setAttribute('data-qa', 'notification');
      div.textContent = message;
      document.body.appendChild(div);
    })
    .catch((errorMessage) => {
      const div = document.createElement('div');

      div.classList.add('error');
      div.setAttribute('data-qa', 'notification');
      div.textContent = errorMessage;
      document.body.appendChild(div);
    });
}

handlePromise(first);
handlePromise(second);
handlePromise(third);
