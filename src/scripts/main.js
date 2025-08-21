'use strict';

const showMessage = (text, className) => {
  const notificationDiv = document.createElement('div');

  notificationDiv.className = className;
  notificationDiv.innerText = text;
  notificationDiv.dataset.qa = 'notification';

  document.body.append(notificationDiv);
};

const firstPromise = (ms) =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, ms);

    document.addEventListener(
      'click',
      (e) => {
        if (e.button === 0) {
          clearTimeout(timeoutId);
          resolve('First promise was resolved');
        }
      },
      { once: true },
    );
  });

firstPromise(3000)
  .then((text) => {
    showMessage(text, 'success');
  })
  .catch((e) => showMessage(e.message, 'error'));

const secondPromise = () =>
  new Promise((resolve) => {
    const handler = (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
        document.removeEventListener('mousedown', handler);
      }
    };

    document.addEventListener('mousedown', handler);
  });

secondPromise().then((text) => {
  showMessage(text, 'success');
});

const thirdPromise = () => {
  let leftClick = false;
  let rightClick = false;

  return new Promise((resolve) => {
    const handler = (e) => {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        document.removeEventListener('mousedown', handler);
      }
    };

    document.addEventListener('mousedown', handler);
  });
};

thirdPromise()
  .then((text) => {
    showMessage(text, 'success');
  })
  .catch(() => showMessage('Third promise was rejected', 'error'));
