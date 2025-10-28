'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0 && !isResolved) {
      isResolved = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!isResolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function showNotification(message, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => {
    showNotification(message, 'success');
  })

  .catch((error) => {
    showNotification(error.message, 'error');
  });

secondPromise
  .then((message) => {
    showNotification(message, 'success');
  })

  .catch((error) => {
    showNotification(error.message, 'error');
  });

thirdPromise
  .then((message) => {
    showNotification(message, 'success');
  })

  .catch((error) => {
    showNotification(error.message, 'error');
  });
