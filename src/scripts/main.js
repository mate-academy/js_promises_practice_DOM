'use strict';

let resolveFirst;
let rejectFirst;
let resolveSecond;
let resolveThird;

const firstPromise = new Promise((resolve, reject) => {
  resolveFirst = resolve;
  rejectFirst = reject;
});

const secondPromise = new Promise((resolve) => {
  resolveSecond = resolve;
});

const thirdPromise = new Promise((resolve) => {
  resolveThird = resolve;
});

let leftClicked = false;
let rightClicked = false;
let thirdResolved = false;
let secondResolved = false;

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = type;
  notification.textContent = message;

  document.body.append(notification);
}

firstPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((message) => {
    showNotification(message, 'error');
  });

secondPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((message) => {
    showNotification(message, 'error');
  });

thirdPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((message) => {
    showNotification(message, 'error');
  });

const firstTimeout = setTimeout(() => {
  rejectFirst('First promise was rejected');
}, 3000);

document.addEventListener('click', (clickEvent) => {
  if (clickEvent.button !== 0) {
    return;
  }

  if (!leftClicked) {
    leftClicked = true;
    clearTimeout(firstTimeout);

    resolveFirst('First promise was resolved');
  }

  if (!secondResolved) {
    resolveSecond('Second promise was resolved');
    secondResolved = true;
  }

  if (leftClicked && rightClicked && !thirdResolved) {
    resolveThird('Third promise was resolved');
    thirdResolved = true;
  }
});

document.addEventListener('contextmenu', (contextEvent) => {
  contextEvent.preventDefault();

  rightClicked = true;

  if (!secondResolved) {
    resolveSecond('Second promise was resolved');
    secondResolved = true;
  }

  if (leftClicked && rightClicked && !thirdResolved) {
    resolveThird('Third promise was resolved');
    thirdResolved = true;
  }
});
