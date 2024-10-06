'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const notification = (message, isSuccess) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = isSuccess ? 'success' : 'error';
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

    const handleThirdClick = (ev) => {
      if (ev.button === 0) {
        leftClickHappened = true;
      } else if (ev.button === 2) {
        rightClickHappened = true;
      }

      if (leftClickHappened && rightClickHappened) {
        resolve('Third promise was resolved after both left and right clicks');
        document.removeEventListener('click', handleThirdClick);
      }
    };

    document.addEventListener('click', handleThirdClick);
  });

  firstPromise
    .then((message) => notification(message, true))
    .catch((err) => notification(err.message, false));

  secondPromise.then((message) => notification(message, true));

  thirdPromise.then((message) => notification(message, true));

  // Відключаємо контекстне меню
  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
  });
});
