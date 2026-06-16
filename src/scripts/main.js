'use strict';

const pushNotification = (title, type) => {
  const message = document.createElement('div');

  message.classList.add(type);
  message.textContent = title;
  message.dataset.qa = 'notification';

  document.body.append(message);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
  setTimeout(() => reject('First promise was rejected'), 3000);
});

firstPromise
  .then((message) => {
    pushNotification(message, 'success');
  })
  .catch((message) => {
    pushNotification(message, 'error');
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

secondPromise
  .then((message) => {
    pushNotification(message, 'success');
  })
  .catch((message) => {
    pushNotification(message, 'error');
  });

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((message) => pushNotification(message, 'success'))
  .catch((message) => {
    pushNotification(message, 'error');
  });
