'use strict';

const doc = document;

// ========== First Promise ==========
const firstPromise = new Promise((resolve, reject) => {
  let timerId = null;

  const onClick = (e) => {
    if (e.button === 0) {
      // left click only
      clearTimeout(timerId);
      resolve('First promise was resolved');
      doc.removeEventListener('click', onClick);
    }
  };

  doc.addEventListener('click', onClick);

  timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    doc.removeEventListener('click', onClick);
  }, 3000);
});

// ========== Second Promise ==========
const secondPromise = new Promise((resolve) => {
  const onLeft = (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
      cleanup();
    }
  };

  const onRight = (e) => {
    e.preventDefault();

    if (e.button === 2) {
      resolve('Second promise was resolved');
      cleanup();
    }
  };

  function cleanup() {
    doc.removeEventListener('click', onLeft);
    doc.removeEventListener('contextmenu', onRight);
  }

  doc.addEventListener('click', onLeft);
  doc.addEventListener('contextmenu', onRight);
});

// ========== Third Promise ==========
const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const onLeft = (e) => {
    if (e.button === 0) {
      leftClick = true;
      checkBoth();
    }
  };

  const onRight = (e) => {
    e.preventDefault();

    if (e.button === 2) {
      rightClick = true;
      checkBoth();
    }
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

// ========== Handlers ==========
function successHandler(message) {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  document.body.appendChild(div);
}

function errorHandler(error) {
  const div = document.createElement('div');

  div.className = 'error';
  div.setAttribute('data-qa', 'notification');

  // error might be a string or an Error object
  div.textContent = error instanceof Error ? error.message : error;

  document.body.appendChild(div);
}

// ========== Attach Handlers ==========
firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
