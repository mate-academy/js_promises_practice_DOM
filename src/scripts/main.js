'use strict';

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    document.removeEventListener('click', onFirstClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function onFirstClick() {
    clearTimeout(timerId);
    document.removeEventListener('click', onFirstClick);
    resolve('First promise was resolved');
  }

  document.addEventListener('click', onFirstClick);
});

firstPromise.then(
  (message) => showNotification(message, 'success'),
  (error) => showNotification(error.message, 'error'),
);

const secondPromise = new Promise((resolve) => {
  function onSecondClick(domEvent) {
    domEvent.preventDefault();
    document.removeEventListener('click', onSecondClick);
    document.removeEventListener('contextmenu', onSecondClick);
    resolve('Second promise was resolved');
  }

  document.addEventListener('click', onSecondClick);
  document.addEventListener('contextmenu', onSecondClick);
});

secondPromise.then((message) => showNotification(message, 'success'));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkBothClicked() {
    if (!leftClicked || !rightClicked) {
      return;
    }

    document.removeEventListener('click', onLeftClick);
    document.removeEventListener('contextmenu', onRightClick);
    resolve('Third promise was resolved');
  }

  function onLeftClick() {
    leftClicked = true;
    checkBothClicked();
  }

  function onRightClick(domEvent) {
    domEvent.preventDefault();
    rightClicked = true;
    checkBothClicked();
  }

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

thirdPromise.then((message) => showNotification(message, 'success'));
