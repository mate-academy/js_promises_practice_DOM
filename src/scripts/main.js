'use strict';

let isClickedLeft = false;
let isClickedRight = false;
let timer;
const notification = document.createElement('div');

notification.setAttribute('data-qa', 'notification');

function resetTimer() {
  clearTimeout(timer);

  timer = setTimeout(() => {
    if (!isClickedLeft) {
      firstPromise();
    }
  }, 3000);
}

function handleFirstClick() {
  firstPromise();
  resetTimer();

  document.removeEventListener('click', handleFirstClick);
}

document.addEventListener('click', handleFirstClick);

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    isClickedLeft = true;
  }

  if (e.button === 2) {
    isClickedRight = true;
  }

  secondPromise();

  if (isClickedLeft && isClickedRight) {
    thirdPromise();
  }
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function firstPromise() {
  return new Promise((resolve, reject) => {
    if (isClickedLeft) {
      resolve('First promise was resolved');
    } else {
      reject(new Error('First promise was rejected'));
    }
  })
    .then((result) => {
      if (!notification.classList.contains('success')) {
        notification.classList.add('success');
      }

      if (notification.classList.contains('error')) {
        notification.classList.remove('error');
      }
      notification.innerText = result;
      document.body.prepend(notification);
    })
    .catch((error) => {
      if (!notification.classList.contains('error')) {
        notification.classList.add('error');
      }

      if (notification.classList.contains('success')) {
        notification.classList.remove('success');
      }
      notification.innerText = error.message;
      document.body.prepend(notification);
    });
}

function secondPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Second promise was resolved');
  }, 1000);
  }).then((result) => {
      notification.classList.add('success');
      notification.classList.remove('error');
      notification.innerText = result;
      document.body.prepend(notification);

  });
}

function thirdPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Third promise was resolved');
  }, 500);
  }).then((result) => {
      notification.classList.add('success');
      notification.classList.remove('error');
      notification.innerText = result;
      document.body.prepend(notification);
  });
}

resetTimer();
