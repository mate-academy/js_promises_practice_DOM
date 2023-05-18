'use strict';

function createPromise1() {
  const resolver = (resolve, reject) => {
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        resolve();
      }
    });

    setTimeout(reject, 3000);
  };

  return new Promise(resolver);
}

function createPromise2() {
  const resolver = (resolve) => {
    document.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();

      if (ev.button === 2) {
        resolve();
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

function createPromise3() {
  const resolver = (resolve, reject) => {
    let rightClick = false;
    let leftClick = false;

    document.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();

      if (ev.button === 2) {
        if (leftClick) {
          resolve();
        } else {
          rightClick = true;
        }
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        if (rightClick) {
          resolve();
        } else {
          leftClick = true;
        }
      }
    });
  };

  return new Promise(resolver);
}

const promise1 = createPromise1();
const promise2 = createPromise2();
const promise3 = createPromise3();

function addNotification(type, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = message;

  document.body.appendChild(notification);
}

promise1
  .then(() => addNotification('success', 'First promise was resolved'))
  .catch(() => addNotification('warning', 'First promise was rejected'));

promise2.then(() => addNotification('success', 'Second promise was resolved'));

promise3.then(() => addNotification('success', 'Third promise was resolved'));
