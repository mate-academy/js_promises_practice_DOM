// 'use strict';

function setSuccessClass(message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = message;
  document.body.appendChild(notification);
}

function setErrorClass(message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('error');
  notification.textContent = message;
  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

firstPromise.then(setSuccessClass).catch(setErrorClass);

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (ev) => {
    ev.preventDefault();

    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();

    if (ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then(setSuccessClass);

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (ev) => {
    leftClick = true;

    if (ev.button === 0 && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClick = true;

    if (ev.button === 2 && leftClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(setSuccessClass);
