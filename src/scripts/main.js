'use strict';

const body = document.querySelector('body');
const logo = document.querySelector('.logo');

// first promise
logo.addEventListener('click', () => {
  clearTimeout(timeout);

  Promise.resolve('First promise was resolved').then((message) => {
    const successText = document.createTextNode(message);
    const notification = document.createElement('div');

    notification.className = 'success';
    notification.setAttribute('data-qa', 'notification');

    notification.appendChild(successText);
    body.appendChild(notification);
  });
});

const timeout = setTimeout(() => {
  Promise.reject(new Error('First promise was rejected')).catch((message) => {
    const errorText = document.createTextNode(message.message);
    const notification = document.createElement('div');

    notification.className = 'error';
    notification.setAttribute('data-qa', 'notification');

    notification.appendChild(errorText);
    body.appendChild(notification);
  });
}, 3.0 * 1000);

// second promise
logo.addEventListener('click', secondPromise);
logo.addEventListener('contextmenu', secondPromise);

function secondPromise() {
  Promise.resolve('Second promise was resolved').then((message) => {
    const successText = document.createTextNode(message);
    const notification = document.createElement('div');

    notification.className = 'success';
    notification.setAttribute('data-qa', 'notification');

    notification.appendChild(successText);
    body.appendChild(notification);
  });
}

// third promise

logo.addEventListener('contextmenu', () => {
  logo.addEventListener('click', thirdPromise);
});

function thirdPromise() {
  Promise.resolve('Third promise was resolved').then((message) => {
    const successText = document.createTextNode(message);
    const notification = document.createElement('div');

    notification.className = 'success';
    notification.setAttribute('data-qa', 'notification');

    notification.appendChild(successText);
    body.appendChild(notification);
  });
}
