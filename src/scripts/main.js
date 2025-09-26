'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Creating first promise
  const firstPromise = new Promise((resolve, reject) => {
    function onMouseDown(e) {
      if (e.button === 0) {
        clearTimeout(timer);

        document.removeEventListener('mousedown', onMouseDown);

        resolve('First promise was resolved');
      }
    }

    const timer = setTimeout(() => {
      document.removeEventListener('mousedown', onMouseDown);

      reject('First promise was rejected');
    }, 3000);

    document.addEventListener('mousedown', onMouseDown);
  });

  firstPromise
    .then((value) => creatingNotification(value, 'success'))
    .catch((reason) => creatingNotification(reason, 'error'));

  // Creating second promise
  const secondPromise = new Promise((resolve) => {
    function onMouseDown(e) {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');

        document.removeEventListener('mousedown', onMouseDown);
      }
    }

    document.addEventListener('mousedown', onMouseDown);
  });

  secondPromise.then((value) => creatingNotification(value, 'success'));

  // Creating third promise
  const thirdPromise = new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    function checkClicks() {
      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    }

    document.addEventListener(
      'click',
      () => {
        leftClick = true;

        checkClicks();
      },
      { once: true },
    );

    document.addEventListener(
      'contextmenu',
      (e) => {
        e.preventDefault();

        rightClick = true;

        checkClicks();
      },
      { once: true },
    );
  });

  thirdPromise.then((value) => creatingNotification(value, 'success'));

  // Creating notification for Promises
  function creatingNotification(text, type) {
    let div = document.querySelector('[data-qa="notification"]');

    if (!div) {
      div = document.createElement('div');
      div.setAttribute('data-qa', 'notification');
      document.body.append(div);
    }

    div.className = type;
    div.textContent = text;
  }
});
