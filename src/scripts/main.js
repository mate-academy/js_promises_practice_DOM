'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    const message = document.createElement('div');

    message.classList.add('error');
    message.setAttribute('data-qa', 'notification');

    message.textContent =
      'First promise was rejected in 3 seconds if not clicked';

    reject(message);
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button !== 0) {
        return;
      }
      clearTimeout(timer);

      const message = document.createElement('div');

      message.setAttribute('data-qa', 'notification');

      message.classList.add('success');

      message.textContent =
        'First promise was resolved on a left click in the document';

      resolve(message);
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        const message = document.createElement('div');

        message.setAttribute('data-qa', 'notification');

        message.classList.add('success');

        message.textContent = 'Second promise was resolved';

        resolve(message);
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      const message = document.createElement('div');

      message.setAttribute('data-qa', 'notification');

      message.classList.add('success');

      message.textContent =
        // eslint-disable-next-line max-len
        'Third promise was resolved only after both left and right clicks happened';

      resolve(message);
    }
  });
});

firstPromise
  .then((message) => body.append(message))
  .catch((e) => body.append(e));

secondPromise.then((message) => body.append(message));
thirdPromise.then((message) => body.append(message));
