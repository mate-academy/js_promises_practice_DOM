'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const LEFT_BUTTON = 0;
  const RIGHT_BUTTON = 2;

  /**
   * Show notification
   *
   * @param {string} message
   * @param {boolean} error
   */
  function showNotification(message, error = false) {
    const notification = document.createElement('div');

    notification.dataset.qa = 'notification';
    notification.className = error ? 'error' : 'success';
    notification.textContent = message;
    document.body.appendChild(notification);
  }

  /**
   * firstPromise
   * @type {Promise<unknown>}
   */
  const firstPromise = new Promise((resolve, reject) => {
    let resolved = false;

    /**
     * FIRST PROMISE
     */
    const clickHandler = (e) => {
      // left mouse button
      if (e.button === LEFT_BUTTON) {
        resolved = true;
        resolve('First promise was resolved');
        // once
        document.removeEventListener('click', clickHandler);
      }
    };

    document.addEventListener('click', clickHandler);

    setTimeout(() => {
      // not resolved after 3 seconds -> reject
      if (!resolved) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('First promise was rejected');
        // once
        document.removeEventListener('click', clickHandler);
      }
    }, 3000);
  });

  firstPromise
    .then((message) => showNotification(message))
    .catch((message) => showNotification(message, true));

  /**
   * SECOND PROMISE
   */
  const secondPromise = new Promise((resolve) => {
    const handler = (e) => {
      // left or right mouse button
      if (e.button === LEFT_BUTTON || e.button === RIGHT_BUTTON) {
        resolve('Second promise was resolved');
        document.removeEventListener('mousedown', handler);
      }
    };

    document.addEventListener('mousedown', handler);
  });

  secondPromise
    .then((message) => showNotification(message))
    .catch((message) => showNotification(message, true));

  /**
   * THIRD PROMISE
   */
  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;
    let settled = false;

    const handler = (e) => {
      if (settled) return;

      if (e.buttons === 3) {
        settled = true;
        document.removeEventListener('mousedown', handler);
        resolve('Third promise was resolved');
        return;
      }

      if (e.button === LEFT_BUTTON) {
        leftClicked = true;
      }
      if (e.button === RIGHT_BUTTON) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        settled = true;
        document.removeEventListener('mousedown', handler);
        resolve('Third promise was resolved');
      }
    };

    document.addEventListener('mousedown', handler);
  });

  thirdPromise
    .then((message) => showNotification(message))
    .catch((message) => showNotification(message, true)); // never rejected

  // чтобы ПКМ не вызывал контекстное меню
  document.addEventListener('contextmenu', (e) => e.preventDefault());
});
