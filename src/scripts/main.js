'use strict';

let isClick = false;
let isContextmenu = false;

function getNotification(className, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = className;
  notification.textContent = message;
  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  addEventListener('click', () => {
    isClick = true;
    clearTimeout(timerID);
    resolve('First promise was resolved');
  });

  const timerID = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  addEventListener('click', () => {
    isClick = true;
    resolve('Second promise was resolved');
  });

  addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isContextmenu = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  addEventListener('click', () => {
    if (isContextmenu) {
      resolve('Third promise was resolved');
    }
  });

  addEventListener('contextmenu', () => {
    if (isClick) {
      resolve('Third promise was resolved');
    }
  });
});

async function handleAllPromises(promises) {
  promises.forEach((promise) => {
    promise
      .then((success) => {
        getNotification('success', success);
      })
      .catch((error) => {
        getNotification('error', error.message);
      });
  });
}

handleAllPromises([firstPromise, secondPromise, thirdPromise]);
