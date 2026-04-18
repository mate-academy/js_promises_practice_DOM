'use strict';

const showNotification = (text, isError = false) => {
  const notification = document.createElement('div');

  notification.classList.add('notification');
  notification.dataset.qa = 'notification';

  if (isError) {
    notification.classList.add('error');
  }

  notification.textContent = text;
  document.body.append(notification);
};

const promise1 = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button !== 0) {
      return;
    }
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    leftClicked = true;

    if (leftClicked === true && rightClicked === true) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then((message) => {
    showNotification(message);
  })
  .catch((error) => {
    showNotification(error, true);
  });

promise2
  .then((message) => {
    showNotification(message);
  })
  .catch(() => {});

promise3
  .then((message) => {
    showNotification(message);
  })
  .catch(() => {});
