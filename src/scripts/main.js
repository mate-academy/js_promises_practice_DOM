'use strict';

const body = document.querySelector('body');
let [leftC, rightC] = [false, false];

function createNotification(msg, divClass) {
  const notification = document.createElement('div');

  notification.textContent = msg;
  notification.className = divClass;
  notification.setAttribute('data-qa', 'notification');
  body.appendChild(notification);
}

function successHandler(msg) {
  createNotification(msg, 'success');
}

function errorHandler(msg) {
  createNotification(msg, 'error');
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', (e) => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  let resolved = false;

  const handler = (e) => {
    if ((e.type === 'click' || e.type === 'contextmenu') && !resolved) {
      resolved = true;
      resolve('Second promise was resolved');
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

const thirdPromise = new Promise((resolve) => {
  let resolved = false;

  const checkAndResolve = () => {
    if (leftC && rightC && !resolved) {
      resolved = true;
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', contextmenuHandler);
    }
  };

  const clickHandler = () => {
    leftC = true;
    checkAndResolve();
  };

  const contextmenuHandler = () => {
    rightC = true;
    checkAndResolve();
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', contextmenuHandler);
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
