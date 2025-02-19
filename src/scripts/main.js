'use strict';

document.addEventListener('DOMContentLoaded', function () {
  let leftClickHappened = false;
  let rightClickHappened = false;

  const firstPromise = new Promise((resolve, reject) => {
    const firstTimeoutId = setTimeout(() => {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }, 3000);

    document.addEventListener(
      'click',
      (e) => {
        if (e.button === 0) {
          clearTimeout(firstTimeoutId);

          resolve('First promise was resolved on a left click in the document');
        }
      },
      { once: true },
    );
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener(
      'click',
      (e) => {
        if (e.button === 0 || e.button === 2) {
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  const thirdPromise = new Promise((resolve) => {
    document.addEventListener('click', (e) => {
      if (e.button === 0) {
        leftClickHappened = true;
      } else if (e.button === 2) {
        rightClickHappened = true;
      }

      if (leftClickHappened && rightClickHappened) {
        resolve('Third promise was resolved');
      }
    });
  });

  firstPromise
    .then((message) => {
      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.className = 'success';
      div.textContent = message;
      document.body.appendChild(div);
    })
    .catch((errorMessage) => {
      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.className = 'error';
      div.textContent = errorMessage;
      document.body.appendChild(div);
    });

  secondPromise
    .then((message) => {
      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.className = 'success';
      div.textContent = message;
      document.body.appendChild(div);
    })
    .catch((errorMessage) => {
      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.className = 'error';
      div.textContent = errorMessage;
      document.body.appendChild(div);
    });

  thirdPromise.then((message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'success';
    div.textContent = message;
    document.body.appendChild(div);
  });
});
