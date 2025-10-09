'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const doc = document;

  function renderNotification(message, className = 'success') {
    const div = document.createElement('div');
    div.setAttribute('data-qa', 'notification');
    div.className = className;
    div.textContent = message;
    document.body.append(div);
  }

  let leftClick = false;
  let rightClick = false;

  const firstPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    doc.addEventListener(
      'click',
      (e) => {
        if (e.button === 0) {
          clearTimeout(timer);
          leftClick = true;
          resolve('First promise was resolved');
        }
      },
      { once: true },
    );
  });

  const secondPromise = new Promise((resolve) => {
    doc.addEventListener(
      'mousedown',
      (e) => {
        e.preventDefault();
        if (e.button === 0 || e.button === 2) {
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  const thirdPromise = new Promise((resolve) => {
    const checkBothClicks = () => {
      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        doc.removeEventListener('mousedown', checkBothClicks);
      }
    };

    doc.addEventListener('mousedown', (e) => {
      if (e.button === 0) leftClick = true;
      if (e.button === 2) rightClick = true;
      checkBothClicks();
    });
  });

  firstPromise
    .then((message) => renderNotification(message))
    .catch((error) => renderNotification(error.message, 'error'));

  secondPromise.then((message) => renderNotification(message));
  thirdPromise.then((message) => renderNotification(message));
});
