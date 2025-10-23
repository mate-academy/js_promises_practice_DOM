'use strict';

// Funkcja do tworzenia divów z komunikatami
function showNotification(message, type) {
  const div = document.createElement('div');
  div.dataset.qa = 'notification';
  div.className = type; // "success" lub "error"
  div.textContent = message;
  document.body.appendChild(div);
}

// ------------------------
// PROMISE 1: firstPromise
// ------------------------
const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  // Lewy klik w dokumencie
  document.addEventListener('click', (e) => {
    if (e.button === 0 && !clicked) {
      clicked = true;
      resolve('First promise was resolved');
    }
  });

  // Odrzucenie po 3 sekundach, jeśli nie kliknięto
  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

// ------------------------
// PROMISE 2: secondPromise
// ------------------------
const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  };
  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

secondPromise.then((message) => showNotification(message, 'success'));

// ------------------------
// PROMISE 3: thirdPromise
// ------------------------
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkBoth = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');

      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', clickHandler);
    }
  };

  const clickHandler = (e) => {
    if (e.button === 0) leftClicked = true;
    if (e.button === 2) rightClicked = true;
    checkBoth();
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

thirdPromise.then((message) => showNotification(message, 'success'));

