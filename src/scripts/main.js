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
      doc.removeEventListener('click', onClick);
      reject(new Error('First promise was rejected'));
    }, 3000);

    const onClick = (e) => {
      if (e.button === 0) {
        clearTimeout(timer);
        doc.removeEventListener('click', onClick);
        leftClick = true;
        resolve('First promise was resolved');
      }
    };

    doc.addEventListener('click', onClick);
  });

  const secondPromise = new Promise((resolve, reject) => {
    const onMouseDown = (e) => {
      e.preventDefault();
      if (e.button === 0 || e.button === 2) {
        doc.removeEventListener('mousedown', onMouseDown);
        resolve('Second promise was resolved');
      }
    };

    doc.addEventListener('mousedown', onMouseDown);
  });

  const thirdPromise = new Promise((resolve, reject) => {
    const onMouseDown = (e) => {
      if (e.button === 0) leftClick = true;
      if (e.button === 2) rightClick = true;

      if (leftClick && rightClick) {
        doc.removeEventListener('mousedown', onMouseDown);
        resolve('Third promise was resolved');
      }
    };

    doc.addEventListener('mousedown', onMouseDown);
  });

  firstPromise
    .then((msg) => renderNotification(msg))
    .catch((err) => renderNotification(err.message, 'error'));

  secondPromise
    .then((msg) => renderNotification(msg))
    .catch((err) => renderNotification(err.message, 'error'));

  thirdPromise
    .then((msg) => renderNotification(msg))
    .catch((err) => renderNotification(err.message, 'error'));
});
