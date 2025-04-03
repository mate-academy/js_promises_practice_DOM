'use strict';

function showNotification(message, type) {
  const notificationDiv = document.createElement('div');

  notificationDiv.setAttribute('data-qa', 'notification');
  notificationDiv.className = type;
  notificationDiv.textContent = message;

  document.body.appendChild(notificationDiv);

  setTimeout(() => {
    notificationDiv.remove();
  }, 3000);
}

const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;
  let isRejected = false;

  const timeoutId = setTimeout(() => {
    if (!isResolved) {
      isRejected = true;
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  function handleLeftClick(evenT) {
    if (evenT.button === 0 && !isRejected && !isResolved) {
      isResolved = true;
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleLeftClick);
      resolve('First promise was resolved');
    }
  }

  document.addEventListener('mousedown', handleLeftClick);
});

const secondPromise = new Promise((resolve) => {
  function handleClick(evenT) {
    if (evenT.button === 0 || evenT.button === 2) {
      document.removeEventListener('mousedown', handleClick);
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('mousedown', handleClick);

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkBothClicks() {
    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handleBothClicks);
      resolve('Third promise was resolved');
    }
  }

  function handleBothClicks(evenT) {
    if (evenT.button === 0) {
      leftClicked = true;
    } else if (evenT.button === 2) {
      rightClicked = true;
    }

    checkBothClicks();
  }

  document.addEventListener('mousedown', handleBothClicks);

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

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
