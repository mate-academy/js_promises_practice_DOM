/* eslint-disable */

'use strict';

const firstPromise = new Promise((resolve, reject) => {
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
  const leftHandler = (event) => {
    if (event.button === 0) {
      resolve('Second promise was resolved');
      body2.removeEventListener('click', leftHandler);
      body2.removeEventListener('contextmenu', rightHandler);
    }
  };
  const rightHandler = (event) => {
    if (event.button === 2) {
      resolve('Second promise was resolved');
      body2.removeEventListener('click', leftHandler);
      body2.removeEventListener('contextmenu', rightHandler);
    }
  };
  body2.addEventListener('click', leftHandler);
  body2.addEventListener('contextmenu', rightHandler);
});

const thirdPromise = new Promise((resolve, reject) => {
  const body3 = document.querySelector('body');
  let leftClick = false;
  let rightClick = false;

  const leftHandler = (event) => {
    if (event.button === 0) {
      leftClick = true;
      checkBothClicks();
    }
  };

  const rightHandler = (el) => {
    if (el.button === 2) {
      rightClick = true;
      checkBothClicks();
    }
  };
  function checkBothClicks() {
    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
      body3.removeEventListener('click', leftHandler);
      body3.removeEventListener('contextmenu', rightHandler);
    }
  }
  body3.addEventListener('click', leftHandler);
  body3.addEventListener('contextmenu', rightHandler);
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

firstPromise.then(handleSuccess, handleError);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);
