'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
  });

  body.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve();
    }
  });
});

firstPromise
  .then(resolved => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="message message-success">
        First promise was resolved!
      </div>
    `);
  })
  .catch(error => {
    error(body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="message message-error"
      >
        First promise was rejected!
      </div>
    `));
  });

secondPromise.then(resolved => {
  body.insertAdjacentHTML('beforeend', `
    <div
      data-qa="notification"
      class="
        message
        message-success
        message-success-second
      "
    >
      Second promise was resolved!
    </div>
  `);
});

const leftClick = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise((resolve) => {
  body.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', () => {
    resolve();
  });
});

Promise.all([leftClick, rightClick])
  .then(() => thirdPromise)
  .then(resolved => {
    body.insertAdjacentHTML('beforeend', `
      <div
        data-qa="notification"
        class="
          message
          message-success
          message-success-third
        "
      >
        Third promise was resolved!
      </div>
    `);
  });
