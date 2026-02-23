'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.body.addEventListener(
    'click',
    () => {
      clearTimeout(timeoutId);

      resolve('First promise was resolved');
    },
    { once: true, signal: controller.signal },
  );
});

const secondPromise = new Promise((resolve, reject) => {
  const controller = new AbortController();
  const finish = (result) => {
    controller.abort();
    resolve(result);
    reject(new Error('Second promise was rejected'));
  };

  document.body.addEventListener(
    'click',
    () => {
      finish('Second promise was resolved');
    },
    { once: true, signal: controller.signal },
  );

  document.body.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      finish('Second promise was resolved');
    },
    { once: true, signal: controller.signal },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  const controller = new AbortController();
  let isLeftClicked = false;
  let isRightClicked = false;

  document.body.addEventListener(
    'click',
    () => {
      if (!isLeftClicked) {
        isLeftClicked = true;
      }
      checkClicks();
    },
    { signal: controller.signal },
  );

  document.body.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();

      if (!isRightClicked) {
        isRightClicked = true;
      }
      checkClicks();
    },
    { signal: controller.signal },
  );

  function checkClicks() {
    if (isLeftClicked && isRightClicked) {
      controller.abort();
      resolve('Third promise was resolved');
    }
  }
});

firstPromise
  .then((message) => {
    showMessage(message);
  })
  .catch((error) => {
    showMessage(error.message, true);
  });

secondPromise
  .then((message) => {
    showMessage(message);
  })
  .catch((error) => {
    showMessage(error.message, true);
  });

thirdPromise
  .then((message) => {
    showMessage(message);
  })
  .catch((error) => {
    showMessage(error.message, true);
  });

function showMessage(message, isError = false) {
  const messageElement = document.createElement('div');

  messageElement.dataset.qa = 'notification';
  messageElement.classList.add(isError ? 'error' : 'success');
  messageElement.textContent = message;

  document.body.append(messageElement);
}
