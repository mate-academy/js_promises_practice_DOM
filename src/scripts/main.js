'use strict';

function firstPromise() {
  return new Promise((resolve, reject) => {
    const firstHandler = (e) => {
      if (e.button === 0) {
        document.removeEventListener('mousedown', firstHandler);
        clearTimeout(scheduleReject)
        resolve('First promise was resolved');
      }
    };

    document.addEventListener('mousedown', firstHandler);

    const scheduleReject = setTimeout(() => {
      document.removeEventListener('mousedown', firstHandler);
      reject(new Error('First promise was rejected'));
    }, 3000)
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    const secondHandler = (e) => {
      if (e.button === 0 || e.button === 2) {
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

    const thirdHandler = (e) => {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick === true && rightClick === true) {
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

function showMessage(text, type) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.classList.add(type);
  message.textContent = text;
  document.body.appendChild(message);
}
