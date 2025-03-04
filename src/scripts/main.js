'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  document.addEventListener('click', () => {
    leftClickHappened = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    rightClickHappened = true;
    checkBothClicks();
  });

  function checkBothClicks() {
    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  }
});

const successCallback = (message) => {
  const notification = document.createElement('div');

  notification.className = 'success';
  notification.setAttribute('data-qa', 'notification');
  notification.innerText = message;

  if (!document.body.contains(notification)) {
    document.body.append(notification);
  }
};

const errorCallback = (errorMessage) => {
  const notification = document.createElement('div');

  notification.className = 'error';
  notification.setAttribute('data-qa', 'notification');
  notification.innerText = errorMessage;

  if (!document.body.contains(notification)) {
    document.body.append(notification);
  }
};

firstPromise.then(successCallback, errorCallback);
secondPromise.then(successCallback, errorCallback);
thirdPromise.then(successCallback, errorCallback);
