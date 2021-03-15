'use strict';

const pushMessage = (description, type, positionTop) => {
  const body = document.querySelector('body');
  const notification = document.createElement('div');

  notification.className = 'notification';
  notification.classList.add(type);
  notification.style.top = `${positionTop}px`;
  notification.innerText = description;
  notification.setAttribute('data-qa', 'notification');

  body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error), 3000);
});

firstPromise
  .then(value => pushMessage(value, 'success', 50))
  .catch(() => pushMessage('First promise was rejected', 'warning', 50));

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    const { button } = e;

    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then((value) => pushMessage(value, 'success', 150));

const thirdPromise = new Promise(resolve => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    const { button } = e;

    if (button === 0) {
      leftButton = !leftButton;
    }

    if (button === 2) {
      rightButton = !rightButton;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(value => pushMessage(value, 'success', 250));
