/* eslint-disable */

'use strict';

const promise1 = new Promise((resolve, reject) => {
  const doc = document.querySelector('body');
  const time = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  const handler = (event) => {
    if (event.button === 0) {
      resolve('First promise was resolved');

      clearTimeout(time);
      doc.removeEventListener('click', handler);
    }
  };

  doc.addEventListener('click', handler);
});

const secondPromise = new Promise((resolve, reject) => {
  const body2 = document.querySelector('body');
  body2.addEventListener('contextmenu', (el) => {
    if (el.button === 2) {
      resolve('Second promise was resolved');
    }
  });
  body2.addEventListener('click', (event) => {
    if (event.button === 0) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  const body3 = document.querySelector('body');
  let leffClick = false;
  let rightClick = false;

  body3.addEventListener('click', (event) => {
    if (event.button === 0) {
      leffClick = true;
      checkBothClicks();
    }
  });
  body3.addEventListener('contextmenu', (el) => {
    if (el.button === 2) {
      rightClick = true;
      checkBothClicks();
    }
  });
  function checkBothClicks() {
    if (leffClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  }
});

function notify(message, success) {
  const data = document.createElement('div');
  data.setAttribute('data-qa', 'notification');
  if (success === true) {
    data.classList.add('success');
  }
  if (success === false) {
    data.classList.add('error');
  }
  data.innerText = message;
  document.body.append(data);
}
function handleSuccess(message) {
  notify(message, true);
}

function handleError(message) {
  notify(message, false);
}

promise1.then(handleSuccess, handleError);
secondPromise.then(handleSuccess);
promise3.then(handleSuccess);
