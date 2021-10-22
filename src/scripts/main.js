
'use strict';

function showNotification(messageType = 'warning', message) {
  const body = document.querySelector('body');
  const notification = document.createElement('div');

  notification.classList.add(messageType);
  notification.setAttribute('data-qa', 'notification');
  notification.innerText = message;
  body.append(notification);
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve({
      messageType: 'success',
      message: 'First promise was resolved',
    });
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then(
    ({ messageType, message }) => {
      showNotification(messageType, message);
    },
    ({ messageType, message }) => {
      showNotification(messageType, message);
    },
  );

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve({
      messageType: 'success',
      message: 'Second promise was resolved',
    });
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve({
      messageType: 'success',
      message: 'Second promise was resolved',
    });
  });
});

promise2
  .then(
    ({ messageType, message }) => {
      showNotification(messageType, message);
    }
  );

const promise3 = new Promise((resolve, reject) => {
  let btnLeft = false;
  let btnRight = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      btnLeft = true;
    }

    if (e.button === 2) {
      btnRight = true;
    }

    if (btnLeft === true && btnRight === true) {
      resolve({
        messageType: 'success',
        message: 'Third promise was resolved',
      });
    }
  });
});

promise3
  .then(({ messageType, message }) => {
    showNotification(messageType, message);
  });
