'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      document.addEventListener('mousedown', (evt) => {
        if (evt.button === 2) {
          resolve('Third promise was resolved');
        }
      });
    }

    if (e.button === 2) {
      document.addEventListener('mousedown', (evObj) => {
        if (evObj.button === 0) {
          resolve('Third promise was resolved');
        }
      });
    }
  });
});

firstPromise.then(success, error);
secondPromise.then(success);
thirdPromise.then(success);

function success(message) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${message}
    </div>
  `);
}

function error(message) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${message}
    </div>
  `);
}
