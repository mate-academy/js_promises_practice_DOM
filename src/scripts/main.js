'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
});

firstPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  function handleLeftClick(e) {
    if (e.button === 0) {
      cleanup();
      resolve('Second promise was resolved');
    }
  }

  function handleRightClick(e) {
    e.preventDefault();
    cleanup();
    resolve('Second promise was resolved');
  }

  function cleanup() {
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

secondPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        resolve();
      }
    },
    { once: true },
  );
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve();
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise]).then(
  () => 'Third promise was resolved',
);

thirdPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));
