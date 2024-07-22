'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let leftClicked = false;

  const firstPromise = new Promise((resolve, reject) => {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('logo')) {
        resolve('First promise was resolved');
      }
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener('click', (e) => {
      if (e.clientX < window.innerWidth / 2) {
        leftClicked = true;
        resolve('Second promise was resolved');
      }
    }, { once: true });
  });

  const thirdPromise = new Promise((resolve) => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (leftClicked && e.clientX > window.innerWidth / 2) {
        resolve('Third promise was resolved');
      }
    }, { once: true });
  });

  const handleSuccess = (message) => {
    const notification = document.createElement('div');
    notification.className = 'message success';
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  const handleError = (error) => {
    const notification = document.createElement('div');
    notification.className = 'message error';
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = error.message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  firstPromise.then(handleSuccess).catch(handleError);
  secondPromise.then(handleSuccess).catch(handleError);
  thirdPromise.then(handleSuccess).catch(handleError);
});
