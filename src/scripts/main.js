'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const createPromise = (resolveOnClick = false, rejectAfter = null) => {
    let resolved = false;
    let rejected = false;

    return new Promise((resolve, reject) => {
      if (resolveOnClick) {
        document.addEventListener('click', () => {
          if (!resolved && !rejected) {
            resolved = true;
            resolve('Promise was resolved on click');
          }
        });
      }

      if (rejectAfter !== null) {
        setTimeout(() => {
          if (!resolved && !rejected) {
            rejected = true;
            reject(new Error('Promise was rejected after timeout'));
          }
        }, rejectAfter);
      }
    });
  };

  const firstPromise = createPromise(true, 3000);
  const secondPromise = createPromise(true);
  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    document.addEventListener('click', () => {
      leftClicked = true;
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
