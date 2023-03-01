'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', () => {
    clicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkClicks() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }
    checkClicks();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;
    checkClicks();
  });
});

function success(message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add('success');
  notification.textContent = message;
  document.body.appendChild(notification);
}

function error(er) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add('warning');
  notification.textContent = er.message;
  document.body.appendChild(notification);
}

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
