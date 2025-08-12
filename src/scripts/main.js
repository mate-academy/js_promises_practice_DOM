'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0 && !settled) {
        settled = true;
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );

  setTimeout(() => {
    if (!settled) {
      settled = true;
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch(() => {});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (e.button === 2) {
      rightClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    }
  });
});

thirdPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch(() => {});
