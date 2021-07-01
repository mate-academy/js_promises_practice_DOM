'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', () => {
    resolve();
  });

  setTimeout(reject, 3000);
});

promise1
  .then(() => {
    body.insertAdjacentHTML('afterbegin',
      `<div class="success" data-qa="notification">
        <p>First promise was resolved!</p>
      </div>`);
  })
  .catch(() => {
    body.insertAdjacentHTML('afterbegin',
      `<div class="warning" data-qa="notification">
        <p>First promise was rejected!</p>
      </div>`);
  });

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

promise2
  .then(() => {
    body.insertAdjacentHTML('afterbegin',
      `<div class="warning" data-qa="notification">
        <p>Second promise was resolved!</p>
      </div>`);
  });

const promise3 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  });
});

promise3
  .then(() => {
    body.insertAdjacentHTML('afterbegin',
      `<div class="warning" data-qa="notification">
        <p>Third promise was resolved!</p>
      </div>`);
  });
