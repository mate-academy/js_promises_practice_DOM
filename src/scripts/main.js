'use strict';

function showNotification(message, cssClass) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(cssClass);
  div.textContent = message;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise]).then(
  () => 'Third promise was resolved',
);

firstPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });

secondPromise.then((message) => {
  showNotification(message, 'success');
});

thirdPromise.then((message) => showNotification(message, 'success'));
