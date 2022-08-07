'use strict';

function notification(className, text) {
  document.body.insertAdjacentHTML('afterbegin', `
  <div class="${className}" data-qa="notification">
  ${text}
</div>
  `);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then(result => notification(result, 'success'))
  .catch(error => notification(error, 'warning'));

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    };
  });
});

promise2
  .then(result => notification(result, 'success'));

const promise3 = new Promise((resolve) => {
  let lclick = false;
  let rclick = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      lclick = true;
    };

    if (e.button === 2) {
      rclick = true;
    };

    if (lclick && rclick) {
      resolve('Third promise was resolved');
    }
  });
});

promise3
  .then(result => notification(result, 'success'));
