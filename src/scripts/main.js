'use strict';

let leftClick = false;
let rightClick = false;

function createNotification(message, stat) {
  const showNotification = document.createElement('div');

  showNotification.setAttribute('data-qa', 'notification');
  showNotification.classList.add(stat);

  const text = document.createElement('p');

  text.textContent = message;

  showNotification.appendChild(text);

  document.body.appendChild(showNotification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise
  .then((message) => {
    createNotification(message, 'success');
  })
  .catch((message) => {
    createNotification(message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClick = true;
  });

  if (leftClick || rightClick) {
    resolve('Second promise was resolved');
  }
});

secondPromise.then((message) => {
  createNotification(message, 'success');
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
  });

  if (leftClick && rightClick) {
    resolve('Third promise was resolved');
  }
});

thirdPromise.then((message) => {
  createNotification(message, 'success');
});
