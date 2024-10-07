'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const notification = (message, type) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(type);
    div.textContent = message;
    document.body.appendChild(div);
  };

  // Перший проміс
  const firstPromise = new Promise((resolve, reject) => {
    document.addEventListener('click', (ev) => {
      if (ev.button === 0) {
        resolve('First promise was resolved');
      }
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });

  // Другий проміс
  const secondPromise = new Promise((resolve) => {
    document.addEventListener(
      'click',
      (ev) => {
        if (ev.button === 0 || ev.button === 2) {
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  // Третій проміс
  const thirdPromise = new Promise((resolve) => {
    let leftClickHappened = false;
    let rightClickHappened = false;

    document.addEventListener('click', (ev) => {
      if (ev.button === 0) {
        leftClickHappened = true;
      }

      if (leftClickHappened && rightClickHappened) {
        resolve('Third promise was resolved');
      }
    });

    document.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();

      if (ev.button === 2) {
        rightClickHappened = true;
      }

      if (leftClickHappened && rightClickHappened) {
        resolve('Third promise was resolved');
      }
    });
  });

  firstPromise
    .then((message) => notification(message, 'success'))
    .catch((err) => notification(err.message, 'error'));

  secondPromise.then((message) => notification(message, 'success'));

  thirdPromise.then((message) => notification(message, 'success'));
});
