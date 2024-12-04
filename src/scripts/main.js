'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let lastClick = null;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      if (lastClick === 'right') {
        resolve('Third promise was resolved');
        lastClick = null;
      } else {
        lastClick = 'left';
      }
    } else if (e.button === 2) {
      if (lastClick === 'left') {
        resolve('Third promise was resolved');
        lastClick = null;
      } else {
        lastClick = 'right';
      }
    }
  });
});

promise1
  .then((res) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.classList.add('success');
    notification.textContent = res;
    body.appendChild(notification);
  })
  .catch((err) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.classList.add('error');
    notification.textContent = err;
    body.appendChild(notification);
  });

promise2.then((res) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = res;
  body.appendChild(notification);
});

promise3.then((res) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = res;
  body.appendChild(notification);
});
