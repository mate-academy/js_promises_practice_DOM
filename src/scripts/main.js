'use strict';

const showNotification = function (element, text, className) {
  const div = document.createElement(element);

  div.setAttribute('data-qa', 'notification');
  div.textContent = text;
  div.classList.add(className);
  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

let leftClickHappened = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClickHappened = true;
    }
  });

  document.addEventListener('contextmenu', () => {
    if (leftClickHappened) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => showNotification('div', message, 'success'))
  .catch((error) => showNotification('div', error, 'error'));

secondPromise.then((message) => showNotification('div', message, 'success'));
thirdPromise.then((message) => showNotification('div', message, 'success'));
