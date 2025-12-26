'use strict';

function firstPromise() {
  return new Promise((resolve, reject) => {
    const scheduleReject = setTimeout(() => {
      document.removeEventListener('click', firstHandler);

      reject(new Error('First promise was rejected'));
    }, 3000);

    const firstHandler = (clickEvent) => {
      if (clickEvent.button === 0) {
        document.removeEventListener('click', firstHandler);

        clearTimeout(scheduleReject);

        resolve('First promise was resolved');
      }
    };

    document.addEventListener('click', firstHandler);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    const secondHandler = (clickEvent) => {
      if (clickEvent.button === 0 || clickEvent.button === 2) {
        document.removeEventListener('mousedown', secondHandler);

        resolve('Second promise was resolved');
      }
    };

    document.addEventListener('mousedown', secondHandler);
  });
}

function thirdPromise() {
  return new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    const thirdHandler = (clickEvent) => {
      if (clickEvent.button === 0) {
        leftClick = true;
      }

      if (clickEvent.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        document.removeEventListener('mousedown', thirdHandler);

        resolve('Third promise was resolved');
      }
    };

    document.addEventListener('mousedown', thirdHandler);
  });
}

firstPromise()
  .then((text) => {
    showMessage(text, 'success');
  })
  .catch((error) => {
    showMessage(error.message, 'error');
  });

secondPromise().then((text) => {
  showMessage(text, 'success');
});

thirdPromise().then((text) => {
  showMessage(text, 'success');
});

/**
 * Displays a message on the screen
 * @param {string} text Message text
 * @param {'success'|'error'} type Message type
 */
function showMessage(text, type) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.classList.add(type);
  message.textContent = text;

  document.body.appendChild(message);
}
