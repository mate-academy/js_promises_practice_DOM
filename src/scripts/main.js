'use strict';

// solution
function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateY(-100px)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (evt) => {
    if (evt.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if ((e.button === 0 && leftClicked) || (e.button === 2 && rightClicked)) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((message) => {
    showNotification(message, 'error');
  });

secondPromise.then((message) => {
  showNotification(message, 'success');
});

thirdPromise.then((message) => {
  showNotification(message, 'success');
});

document.addEventListener('contextmenu', (evt) => {
  evt.preventDefault();
});
