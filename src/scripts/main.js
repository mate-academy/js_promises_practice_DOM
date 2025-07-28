'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

// FIRST PROMISE
const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      // left click
      resolved = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!resolved) {
      document.removeEventListener('click', handleClick);
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

// SECOND PROMISE
const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      // left or right click
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
});

// THIRD PROMISE
const thirdPromise = new Promise((resolve, reject) => {
  let lastClick = null;
  let timeoutId = null;

  const handleClick = (e) => {
    const now = Date.now();

    if (!lastClick) {
      lastClick = { button: e.button, time: now };

      // Reset if druga część nie nastąpi w 3 sekundy
      timeoutId = setTimeout(() => {
        lastClick = null;
      }, 3000);
    } else {
      const timeDiff = now - lastClick.time;
      const isOtherButton = lastClick.button !== e.button;

      if (isOtherButton && timeDiff <= 3000) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', handleClick);
        clearTimeout(timeoutId);
      } else {
        // Reset logic — too slow or same button clicked again
        lastClick = { button: e.button, time: now };
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          lastClick = null;
        }, 3000);
      }
    }
  };

  document.addEventListener('click', handleClick);
});

// Attach handlers

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

secondPromise.then((msg) => showNotification(msg));

thirdPromise.then((msg) => showNotification(msg));

// Optional: Allow right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());
