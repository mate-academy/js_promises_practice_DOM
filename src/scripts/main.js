'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  let isFinished = false;

  document.addEventListener(
    'click',
    () => {
      resolve();
      isFinished = true;
    },
    { once: true },
  );

  setTimeout(() => {
    if (!isFinished) {
      isFinished = true;
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

function handler(numberPromise, stat) {
  const ntf = document.createElement('div');

  ntf.setAttribute('data-qa', 'notification');
  body.appendChild(ntf);
  ntf.classList.add('notification');

  if (stat === 'resolve') {
    ntf.classList.add('success');
    ntf.textContent = `${numberPromise} promise was resolved`;
  } else {
    ntf.classList.add('error');
    ntf.textContent = `${numberPromise} promise was rejected`;
  }
}

firstPromise
  .then(() => handler('First', 'resolve'))
  .catch(() => handler('First', 'reject'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve();
    },
    { once: true },
  );
});

secondPromise.then(() => handler('Second', 'resolve'));

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function checkBothClicks() {
    if (leftClick && rightClick) {
      resolve();
    }
  }

  document.addEventListener(
    'click',
    () => {
      leftClick = true;
      checkBothClicks();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      rightClick = true;
      checkBothClicks();
    },
    { once: true },
  );
});

thirdPromise.then(() => handler('Third', 'resolve'));
