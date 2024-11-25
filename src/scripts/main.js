'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function notification(message, isError = false) {
  const createNotification = document.createElement('div');

  if (!isError) {
    createNotification.classList.add('success');
  } else {
    createNotification.classList.add('error');
  }

  createNotification.setAttribute('data-qa', 'notification');
  createNotification.textContent = message;

  document.body.appendChild(createNotification);
}

// Перший проміс

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(() => {
    reject(new Error('First promise was resolved after timeout'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeOut);
    resolve('First promise was resolved');
  });
});

// Другий проміс

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

// Третій проміс

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false; // Відслідковує ліву кнопку
  let rightClicked = false; // Відслідковує праву кнопку

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => notification(message))
  .catch((error) => notification(error, true));

secondPromise.then((message) => notification(message));

thirdPromise.then((message) => notification(message));
