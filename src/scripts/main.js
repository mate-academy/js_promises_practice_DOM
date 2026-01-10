'use strict';

const body = document.querySelector('body');

function createMessage(message, classStatus) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  div.classList.add(classStatus);
  body.append(div);
}

function click() {
  const firstPromise = new Promise((resolve, reject) => {
    const clickEvent = (e) => {
      if (e.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');
      }
    };

    body.addEventListener('mousedown', clickEvent, { once: true });

    const timer = setTimeout(() => {
      body.removeEventListener('mousedown', clickEvent);
      reject(new Error('First promise was rejected'));
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    body.addEventListener(
      'mousedown',
      (e) => {
        if (e.button === 0 || e.button === 2) {
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    const clickEvent = (e) => {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        body.removeEventListener('mousedown', clickEvent);
        resolve('Third promise was resolved');
      }
    };

    body.addEventListener('mousedown', clickEvent);
  });

  firstPromise
    .then((sms) => createMessage(sms, 'success'))
    .catch((error) => createMessage(error.message, 'error'));

  secondPromise.then((sms) => createMessage(sms, 'success'));
  thirdPromise.then((sms) => createMessage(sms, 'success'));
}

click();
