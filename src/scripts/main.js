'use strict';

const body = document.querySelector('body');

let rejectTimeout;

const firstPromise = new Promise((resolve, reject) => {
  rejectTimeout = setTimeout(() => {
    reject(new Error("'First promise was rejected'"));
  }, 3000);

  body.addEventListener(
    'click',
    (e) => {
      const bodyEl = e.target.closest('body');

      if (!bodyEl) {
        return;
      }
      e.preventDefault();
      clearTimeout(rejectTimeout);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

firstPromise
  .then((messageText) => {
    const message = document.createElement('div');

    message.classList.add('success');
    message.dataset.qa = 'notification';
    message.textContent = messageText;

    document.body.append(message);
  })
  .catch((errorText) => {
    const message = document.createElement('div');

    message.classList.add('error');
    message.dataset.qa = 'notification';
    message.textContent = 'First promise was rejected';

    document.body.append(message);
  });

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((contextmenuText) => {
  const message = document.createElement('div');

  message.classList.add('success');
  message.dataset.qa = 'notification';
  message.textContent = contextmenuText;

  document.body.append(message);
});

Promise.all([firstPromise, secondPromise]).then(() => {
  const message = document.createElement('div');

  message.classList.add('success');
  message.dataset.qa = 'notification';
  message.textContent = 'Third promise was resolved';

  document.body.append(message);
});
