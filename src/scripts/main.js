'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(isError ? 'error' : 'success');
  div.textContent = message;
  document.body.appendChild(div);
}

// Blokuje menu kontekstowe globalnie
document.addEventListener('contextmenu', (evt) => {
  evt.preventDefault();
});

// Promise 1
const promise1 = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'mousedown',
    (evt) => {
      if (evt.button === 0) {
        clearTimeout(timeoutId);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

promise1
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

// Promise 2
const promise2 = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (evt) => {
      if (evt.button === 0) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (evt) => {
      evt.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

promise2.then((msg) => showNotification(msg));

// Promise 3
const promise3 = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const onMouseDown = (evt) => {
    if (evt.button === 0) {
      leftClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        cleanup();
      }
    }
  };

  const onContextMenu = (evt) => {
    evt.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      cleanup();
    }
  };

  const cleanup = () => {
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('contextmenu', onContextMenu);
  };

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('contextmenu', onContextMenu);
});

promise3.then((msg) => showNotification(msg));
