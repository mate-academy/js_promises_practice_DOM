'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const time = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(time);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener(
    'click',
    () => {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      rightClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );
});

function showMessage(text, className) {
  const notification = document.createElement('div');

  notification.textContent = text;
  notification.dataset.qa = 'notification';
  notification.classList.add(className);
  document.body.append(notification);
}

firstPromise.then((msg) => {
  showMessage(msg, 'success');
});

firstPromise.catch((msg) => {
  showMessage(msg.message, 'error');
});

secondPromise.then((msg) => {
  showMessage(msg, 'success');
});

thirdPromise.then((msg) => {
  showMessage(msg, 'success');
});
