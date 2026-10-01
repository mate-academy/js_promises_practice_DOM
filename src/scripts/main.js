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

firstPromise.then(
  (message) => {
    const notification = document.createElement('div');

    notification.dataset.qa = 'notification';
    notification.classList.add('success');
    notification.textContent = message;
    document.body.append(notification);
  },
  (error) => {
    const notification = document.createElement('div');

    notification.dataset.qa = 'notification';
    notification.classList.add('error');
    notification.textContent = error.message;
    document.body.append(notification);
  },
);

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then(
  (message) => {
    const notification = document.createElement('div');

    notification.dataset.qa = 'notification';
    notification.classList.add('success');
    notification.textContent = message;
    document.body.append(notification);
  },
  (error) => {
    const notification = document.createElement('div');

    notification.dataset.qa = 'notification';
    notification.classList.add('error');
    notification.textContent = error.message;
    document.body.append(notification);
  },
);

const thirdPromise = new Promise((resolve, reject) => {
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

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(
  (message) => {
    const notification = document.createElement('div');

    notification.dataset.qa = 'notification';
    notification.classList.add('success');
    notification.textContent = message;
    document.body.append(notification);
  },
  (error) => {
    const notification = document.createElement('div');

    notification.dataset.qa = 'notification';
    notification.classList.add('error');
    notification.textContent = error.message;
    document.body.append(notification);
  },
);
