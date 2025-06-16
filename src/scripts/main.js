'use strict';

function addHandlers(promiseResult) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  if (promiseResult instanceof Error) {
    div.classList.add('error');
    div.textContent = promiseResult.message;
  } else {
    div.classList.add('success');
    div.textContent = promiseResult;
  }

  document.body.appendChild(div);
}

let firstResolved = false;

const firstPromise = new Promise((resolve, reject) => {
  function handleClick(e) {
    if (e.button === 0) {
      firstResolved = true;

      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  }
  document.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!firstResolved) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', handleClick);
    }
  }, 3000);
});

let secondResolved = false;

const secondPromise = new Promise((resolve) => {
  function handleClick() {
    if (!secondResolved) {
      secondResolved = true;
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  function checkBoth() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleLeft);
      document.removeEventListener('contextmenu', handleRight);
    }
  }

  function handleLeft(e) {
    if (e.button === 0) {
      leftClick = true;
      checkBoth();
    }
  }

  function handleRight(e) {
    if (e.button === 2) {
      rightClick = true;
      checkBoth();
    }
  }

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
});

firstPromise.then(addHandlers).catch(addHandlers);
secondPromise.then(addHandlers);
thirdPromise.then(addHandlers);
