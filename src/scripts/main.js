'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const onMouseDown = (e) => {
    if (e.button === 0) {
      resolve('');
      cleanup();
    }
  };

  const timer = setTimeout(() => {
    reject(new Error());
    cleanup();
  }, 3000);

  function cleanup() {
    document.removeEventListener('mousedown', onMouseDown);
    clearTimeout(timer);
  }

  document.addEventListener('mousedown', onMouseDown);
});

const secondPromise = new Promise((resolve) => {
  const onAnyClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  };

  document.addEventListener('mousedown', onAnyClick);
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  const trackClicks = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  };

  document.addEventListener('mousedown', trackClicks);
});

function appendMessage(message, classStatus) {
  const div = document.createElement('div');

  div.classList.add(classStatus);
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then(() => {
    appendMessage('First promise was resolved', 'success');
  })
  .catch(() => {
    appendMessage('First promise was rejected', 'error');
  });

secondPromise.then(() => {
  appendMessage('Second promise was resolved', 'success');
});

thirdPromise.then(() => {
  appendMessage('Third promise was resolved', 'success');
});

document.addEventListener('contextmenu', (e) => e.preventDefault());
