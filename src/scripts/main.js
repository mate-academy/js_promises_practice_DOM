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
        // console.log('✅ First Promise: Resolved (Лівий клік)');
        resolve('First promise was resolved');
      }
    };

    body.addEventListener('mousedown', clickEvent, { once: true });

    const timer = setTimeout(() => {
      body.removeEventListener('mousedown', clickEvent);
      // console.log('❌ First Promise: Rejected (Час вийшов)');
      reject(new Error('First promise was rejected'));
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    body.addEventListener(
      'mousedown',
      (e) => {
        if (e.button === 0 || e.button === 2) {
          // console.log('✅ Second Promise: Resolved (Будь-який клік)');
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  const thirdPromise = new Promise((resolve) => {
    const clickEvent = (e) => {
      const isLeft = e.button === 0;
      const isRight = e.button === 2;

      if (isLeft === true && isRight === true) {
        resolve('Third promise was resolved');
        body.addEventListener('mousedown', clickEvent);
      }
      // console.log('✅ Third Promise: Resolved (Обидві кнопки разом)');
    };

    body.removeEventListener('mousedown', clickEvent);
  });

  firstPromise
    .then((sms) => createMessage(sms, 'success'))
    .catch((error) => createMessage(error, 'error'));

  secondPromise.then((sms) => createMessage(sms, 'success'));
  thirdPromise.then((sms) => createMessage(sms, 'success'));
}

click();
