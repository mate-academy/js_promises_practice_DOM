'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  function checkIsBothAreClicked() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClick = true;

    checkIsBothAreClicked();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    checkIsBothAreClicked();
  });
});

firstPromise.then(notification).catch((err) => {
  notification(err.message, false);
});

secondPromise.then(notification);

thirdPromise.then(notification);

function notification(message, success = true) {
  const divTag = document.createElement('div');

  divTag.classList.add(success ? 'success' : 'error');
  divTag.setAttribute('data-qa', 'notification');
  divTag.textContent = message;
  document.body.append(divTag);
}
