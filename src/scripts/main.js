'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    e.preventDefault();
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000,);
});

firstPromise.then(showSuccessMessage);
firstPromise.catch(showErrorMessage);

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('mouseup', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then(showSuccessMessage);

const thirdPromise = new Promise((resolve) => {
  let leftClickCount = 0;
  let rightClickCount = 0;

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      rightClickCount++;
    }

    if (e.button === 2) {
      leftClickCount++;
    }

    if (rightClickCount === 1 && leftClickCount === 1) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(showSuccessMessage);

function showSuccessMessage(text) {
  const message = document.createElement('div');
  const body = document.querySelector('body');

  message.textContent = text;
  message.setAttribute('data-qa', 'notification');
  message.className = 'success';
  body.append(message);
}

function showErrorMessage(text) {
  const message = document.createElement('div');
  const body = document.querySelector('body');

  message.textContent = text;
  message.setAttribute('data-qa', 'notification');
  message.className = 'warning';
  body.append(message);
}
