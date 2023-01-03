'use strict';

function displayNotification(text, type = 'success') {
  const notification = (
    `<div class="${type}" data-qa="notification">${text}...</div>`);

  document.body.insertAdjacentHTML('beforeend', notification);
}

document.addEventListener('contextmenu', ev => ev.preventDefault());

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(Error());
  }, 3000);
});

const promise2 = new Promise(resolve => {
  ['click', 'contextmenu'].forEach(ev => {
    document.addEventListener(ev, () => {
      resolve();
    });
  });
});

const promise3 = new Promise(resolve => {
  let rmb = false;
  let lmb = false;

  document.addEventListener('mousedown', ev => {
    if (ev.button === 0) {
      rmb = true;
    };

    if (ev.button === 2) {
      lmb = true;
    };

    if (rmb && lmb) {
      resolve();
    }
  });
});

promise1
  .then(() => displayNotification('First promise was resolved'))
  .catch(() => displayNotification('First promise was rejected', 'warning'));

promise2
  .then(() => displayNotification('Second promise was resolved'));

promise3
  .then(() => displayNotification('Third promise was resolved'));
