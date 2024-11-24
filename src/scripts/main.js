'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let leftClick = false;
let rightClick = false;

const promise3 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
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

handlePromise(promise1);
handlePromise(promise2);
handlePromise(promise3);
