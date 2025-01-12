'use strict';

function showSuccessNotification() {
  const messageDiv = document.createElement('div');

  messageDiv.dataset.qa = 'notification';
  messageDiv.classList.add('success');
  document.body.appendChild(messageDiv);
}

function showErrorNotification() {
  const messageDiv = document.createElement('div');

  messageDiv.dataset.qa = 'notification';
  messageDiv.classList.add('error');
  document.body.appendChild(messageDiv);
}

const promise1 = new Promise((resolve, reject) => {
  let timeoutId = null;

  const clickHandler = (e) => {
    const target = e.button;

    if (target === 0) {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', clickHandler);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);

  timeoutId = setTimeout(() => {
    document.removeEventListener('mousedown', clickHandler);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then(() => showSuccessNotification())
  .catch(() => showErrorNotification());

const promise2 = new Promise((resolve) => {
  const mouseClickHandler = (e) => {
    const target = e.button;

    if (target === 0 || target === 2) {
      e.preventDefault();
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', mouseClickHandler);
    }
  };

  document.addEventListener('mousedown', mouseClickHandler);
});

promise2
  .then(() => showSuccessNotification())
  .catch(() => showErrorNotification());

const promise3 = new Promise((resolve) => {
  let leftClickMouse = false;
  let rigthClickMouse = false;

  const mouseClickHandler = (e) => {
    const target = e.button;

    if (target === 0) {
      leftClickMouse = true;
    } else if (target === 2) {
      e.preventDefault();

      rigthClickMouse = true;
    }

    if (leftClickMouse && rigthClickMouse) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', mouseClickHandler);
    }
  };

  document.addEventListener('mousedown', mouseClickHandler);
});

promise3
  .then(() => showSuccessNotification())
  .catch(() => showErrorNotification());
