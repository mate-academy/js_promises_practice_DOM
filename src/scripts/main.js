'use strict';

const showNotification = (text, isError = false) => {
  const notification = document.createElement('div');

  notification.classList.add('notification');
  notification.dataset.qa = 'notification';

  if (isError) {
    notification.classList.add('error');
  } else {
    notification.classList.add('succes');
  }

  notification.textContent = text;
  document.body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
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

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button !== 0) {
      return;
    }
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button !== 2) {
      return;
    }
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
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

firstPromise
  .then((message) => {
    showNotification(message);
  })
  .catch((error) => {
    showNotification(error, true);
  });

secondPromise
  .then((message) => {
    showNotification(message);
  })
  .catch((error) => {
    showNotification(error, true);
  });

thirdPromise
  .then((message) => {
    showNotification(message);
  })
  .catch((error) => {
    showNotification(error, true);
  });
