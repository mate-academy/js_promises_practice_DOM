'use strict';

const doc = document;

// 1. First promise
const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  const onClick = (e) => {
    if (e.button === 0 && !settled) {
      // left click
      settled = true;
      clearTimeout(timerId); // stop the pending rejection
      resolve('First promise was resolved');
      doc.removeEventListener('click', onClick);
    }
  };

  doc.addEventListener('click', onClick);

  const timerId = setTimeout(() => {
    if (!settled) {
      settled = true;
      reject('First promise was rejected'); // must be string, not Error
      doc.removeEventListener('click', onClick);
    }
  }, 3000);
});

// 2. Second promise
const secondPromise = new Promise((resolve) => {
  const onClick = () => {
    resolve('Second promise was resolved');
    cleanup();
  };

  const onRightClick = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    cleanup();
  };

  function cleanup() {
    doc.removeEventListener('click', onClick);
    doc.removeEventListener('contextmenu', onRightClick);
  }

  doc.addEventListener('click', onClick);
  doc.addEventListener('contextmenu', onRightClick);
});

// 3. Third promise
const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const onLeft = () => {
    leftClick = true;
    checkBoth();
  };

  const onRight = (e) => {
    e.preventDefault();
    rightClick = true;
    checkBoth();
  };

  function checkBoth() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      doc.removeEventListener('click', onLeft);
      doc.removeEventListener('contextmenu', onRight);
    }
  }

  doc.addEventListener('click', onLeft);
  doc.addEventListener('contextmenu', onRight);
});

// Handlers
function successHandler(message) {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.appendChild(div);
}

function errorHandler(message) {
  const div = document.createElement('div');

  div.className = 'error';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.appendChild(div);
}

// Attach handlers
firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
