'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  // Предотвращаем стандартное действие для контекстного меню
  body.addEventListener('contextmenu', (eve) => {
    eve.preventDefault();
  });

  const showNotification = (message, type) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.textContent = message;
    notification.className = 'notification';

    if (type === 'error') {
      notification.classList.add('error');
    } else {
      notification.classList.add('success');
    }

    body.appendChild(notification);
  };

  const firstPromise = new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }, 3000);

    body.addEventListener('click', () => {
      clearTimeout(timeoutId);
      resolve('First promise was resolved on a left click in the document');
    });
  });

  const secondPromise = new Promise((resolve) => {
    const handleClick = (eve) => {
      if (eve.button === 0 || eve.button === 2) {
        resolve('Second promise was resolved');
        body.removeEventListener('click', handleClick);
        body.removeEventListener('contextmenu', handleClick);
      }
    };

    body.addEventListener('click', handleClick);
    body.addEventListener('contextmenu', handleClick);
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClickDone = false;
    let rightClickDone = false;

    const checkClicks = () => {
      if (leftClickDone && rightClickDone) {
        resolve(
          'Third promise was resolved only after both left and right clicks ' +
            'happened',
        );
        body.removeEventListener('click', leftClickHandler);
        body.removeEventListener('contextmenu', rightClickHandler);
      }
    };

    const leftClickHandler = (eve) => {
      if (eve.button === 0) {
        leftClickDone = true;
        checkClicks();
      }
    };

    const rightClickHandler = (eve) => {
      if (eve.button === 2) {
        rightClickDone = true;
        checkClicks();
      }
    };

    body.addEventListener('click', leftClickHandler);
    body.addEventListener('contextmenu', rightClickHandler);
  });

  firstPromise
    .then((message) => {
      showNotification(message, 'success');
    })
    .catch((error) => {
      showNotification(error.message, 'error');
    });

  secondPromise.then((message) => {
    showNotification(message, 'success');
  });

  thirdPromise.then((message) => {
    showNotification(message, 'success');
  });
});
