'use strict';

const firstPromise = new Promise((resolve, reject) => {
  function clickHandler(event) {
    if (event.type === 'click') {
      resolve('First promise was resolved');
    }
  }

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    document.removeEventListener('click', clickHandler);
    reject(new Error('Error: First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  function clickHandler(event) {
    if (event.type === 'click' || event.type === 'contextmenu') {
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

function hasBothClicksHappened(leftClick, rightClick) {
  return leftClick && rightClick;
}

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function clickHandler(event) {
    if (event.type === 'click') {
      leftClick = true;
    } else if (event.type === 'contextmenu') {
      rightClick = true;
    }

    if (hasBothClicksHappened(leftClick, rightClick)) {
      resolve('Third promise was resolve');
    }
  }

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

firstPromise
  .then((message) => {
    showNotification('success', message);
  })
  .catch((error) => {
    showNotification('warning', error.message);
  });

secondPromise
  .then((message) => {
    showNotification('success', message);
  });

thirdPromise
  .then((message) => {
    showNotification('success', message);
  });

function showNotification(className, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = className;
  notification.textContent = message;
  document.body.appendChild(notification);
}
