'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = 'success';
    notification.textContent = message;
    document.body.append(notification);
  })
  .catch((message) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = 'error';
    notification.textContent = message.message;
    document.body.append(notification);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'success';
  notification.textContent = message;
  document.body.append(notification);
});

secondPromise.catch((message) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'error';
  notification.textContent = message;
  document.body.append(notification);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'success';
  notification.textContent = message;
  document.body.append(notification);
});

thirdPromise.catch((message) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'error';
  notification.textContent = message;
  document.body.append(notification);
});
