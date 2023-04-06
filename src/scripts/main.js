'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error('Promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = Promise.all([
  new Promise((resolve) => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        resolve('left');
      }
    });
  }),

  new Promise((resolve) => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 2) {
        resolve('right');
      }
    });
  }),
]);

firstPromise
  .then(() => {
    const messageHTML = `<div class="success" data-qa="notification">`
      + `First promise was resolved</div>`;

    document.body.insertAdjacentHTML('beforeend', messageHTML);
  })
  .catch(() => {
    const errorMessageHTML = `<div class="warning" data-qa="notification">`
      + `First promise was rejected</div>`;

    document.body.insertAdjacentHTML('beforeend', errorMessageHTML);
  });

secondPromise
  .then(() => {
    const messageHTML = `<div class="success" data-qa="notification">`
      + `Second promise was resolved</div>`;

    document.body.insertAdjacentHTML('beforeend', messageHTML);
  });

thirdPromise.then(() => {
  const errorMessageHTML = `<div class="success" data-qa="notification">`
      + `Third promise was resolved</div>`;

  document.body.insertAdjacentHTML('beforeend', errorMessageHTML);
});
