'use strict';

// Утиліта для створення повідомлень
function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;
  div.classList.add(isError ? 'error' : 'success');
  document.body.appendChild(div);
}

// --- FIRST PROMISE ---
const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      // left click
      resolved = true;
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler, { once: true });

  setTimeout(() => {
    if (!resolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

// --- SECOND PROMISE ---
const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler, { once: true });
});

// --- THIRD PROMISE ---
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

// --- HANDLERS ---
function successHandler(message) {
  showNotification(message);
}

function errorHandler(error) {
  showNotification(error.message, true);
}

// --- Promise chains ---
firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
