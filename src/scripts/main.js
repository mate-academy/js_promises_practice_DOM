'use strict';

const notifDiv = document.createElement('div');

notifDiv.setAttribute('data-qa', 'notification');
document.body.appendChild(notifDiv);

function showNotification(message, success, error) {
  const notification = document.querySelector('[data-qa="notification"]');

  notification.textContent = message;

  if (success) {
    notification.className = 'success';
  } else if (error) {
    notification.className = 'error';
  }
}

let timeCheck;

const firstPromise = new Promise((resolve, reject) => {
  timeCheck = setTimeout(() => {
    clearTimeout(timeCheck);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function leftClick(e) {
    if (e.button === 0) {
      clearTimeout(timeCheck);
      resolve('First promise was resolved');
      document.removeEventListener('click', leftClick);
      e.stopPropagation();
    }
  };

  document.addEventListener('click', leftClick);
});

firstPromise.then(() => {
  showNotification('First promise was resolved', true, false);
}).catch(() => {
  showNotification('First promise was rejected', false, true);
});

const secondPromise = new Promise((resolve) => {
  function anyClicked(e) {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', anyClicked);
      e.preventDefault();
      e.stopPropagation();
    }
  }

  document.addEventListener('mousedown', anyClicked);
});

secondPromise.then(() => {
  showNotification('Second promise was resolved', true, false);
});

const thirdPromise = new Promise((resolve) => {
  let clickedL = false;
  let clickedR = false;

  function clickBoth(e) {
    if (e.button === 0 && !clickedL) {
      clickedL = true;
      e.preventDefault();
      e.stopPropagation();
    } else if (e.button === 2 && !clickedR) {
      clickedR = true;
      e.preventDefault();
      e.stopPropagation();
    }

    if (clickedL && clickedR) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', clickBoth);
    }
  }

  document.addEventListener('mousedown', clickBoth);
});

thirdPromise.then(() => {
  showNotification('Third promise was resolved', true, false);
});
