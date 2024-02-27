'use strict';

document.addEventListener('DOMContentLoaded', function() {
  function updateNotification(stat, message) {
    const notificationDiv = document.createElement('div');

    notificationDiv.setAttribute('data-qa', 'notification');
    notificationDiv.innerHTML = message;
    notificationDiv.classList.add(stat);
    document.body.appendChild(notificationDiv);
  }

  const firstPromise = new Promise((resolve, reject) => {
    function handleClick() {
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }

    document.addEventListener('click', handleClick);

    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', handleClick);
    }, 3000);
  });

  firstPromise
    .then((message) => {
      updateNotification('success', message);
    })
    .catch((error) => {
      updateNotification('warning', error.message);
    });

  const secondPromise = new Promise((resolve) => {
    function handleClick(events) {
      if (events.type === 'click' && (events.button === 0
        || events.button === 2)) {
        resolve('Second promise was resolved');
        document.removeEventListener('click', handleClick);
      }
    }

    document.addEventListener('click', handleClick);
  });

  secondPromise.then((message) => {
    updateNotification('success', message);
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    function handleLeftClick() {
      leftClick = true;
      checkBothClicks();
    }

    function handleRightClick(events) {
      if (events.type === 'contextmenu') {
        events.preventDefault();
        rightClick = true;
        checkBothClicks();
      }
    }

    function checkBothClicks() {
      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', handleLeftClick);
        document.removeEventListener('contextmenu', handleRightClick);
      }
    }

    document.addEventListener('click', handleLeftClick);
    document.addEventListener('contextmenu', handleRightClick);
  });

  thirdPromise.then((message) => {
    updateNotification('success', message);
  }).catch((error) => {
    updateNotification('warning', error.message);
  });
});
