'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const handleLeftClick = (e) => {
    if (e.button === 0) {
      cleanup();
      resolve('First promise was resolved');
    }
  };

  const timer = setTimeout(() => {
    cleanup();
    reject(new Error('First promise was rejected'));
  }, 3000);

  function cleanup() {
    document.removeEventListener('mousedown', handleLeftClick);
    clearTimeout(timer);
  }

  document.addEventListener('mousedown', handleLeftClick);
});

firstPromise
  .then((message) => {
    showMessage(message, 'success');
  })
  .catch((err) => {
    showMessage(err.message, 'error');
  });

const secondPromise = new Promise((resolve, reject) => {
  const handleLRClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handleLRClick);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleLRClick);
});

secondPromise
  .then((message) => {
    showMessage(message, 'success');
  })
  .catch((err) => {
    showMessage(err.message, 'error');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let firstClick = null; // 0 or 2

  const handleLRClick = (e) => {
    if (![0, 2].includes(e.button)) {
      return;
    }

    if (firstClick === null) {
      firstClick = e.button;
    }

    if (firstClick !== null && e.button !== firstClick) {
      document.removeEventListener('mousedown', handleLRClick);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleLRClick);
});

thirdPromise
  .then((message) => {
    showMessage(message, 'success');
  })
  .catch((err) => {
    showMessage(err.message, 'error');
  });

function showMessage(message, className) {
  const div = Object.assign(document.createElement('div'), {
    textContent: message,
    className: className,
  });

  div.setAttribute('data-qa', 'notification');

  document.body.appendChild(div);
}
