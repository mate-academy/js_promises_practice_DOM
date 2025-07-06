'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 👇 Запам’ятовуємо, хто першим показав повідомлення
  let shownMessageFrom = null;

  function showNotification(message, isSuccess = true, source) {
    // Показати повідомлення лише якщо ніхто ще не показував
    if (shownMessageFrom !== null) {
      return;
    }
    shownMessageFrom = source;

    let existing = document.querySelector('[data-qa="notification"]');

    if (!existing) {
      existing = document.createElement('div');
      existing.dataset.qa = 'notification';
      document.body.appendChild(existing);
    }

    existing.className = isSuccess ? 'success' : 'error';
    existing.textContent = message;
  }

  // ==== FIRST PROMISE ====
  let firstResolvedOrRejected = false;
  const firstPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (!firstResolvedOrRejected) {
        firstResolvedOrRejected = true;

        const c = 'First promise was rejected in 3 seconds';
        const d = ' if not clicked';

        reject(new Error(`${c}${d}`));
      }
    }, 3000);

    document.addEventListener(
      'click',
      (e) => {
        if (e.button === 0 && !firstResolvedOrRejected) {
          firstResolvedOrRejected = true;
          clearTimeout(timer);
          resolve('First promise was resolved on a left click in the document');
        }
      },
      { once: true },
    );
  });

  firstPromise
    .then((message) => showNotification(message, true, 'first'))
    .catch((error) => showNotification(error.message, false, 'first'));

  // ==== SECOND PROMISE ====
  let secondResolved = false;
  const secondPromise = new Promise((resolve) => {
    function handler(e) {
      if ((e.button === 0 || e.button === 2) && !secondResolved) {
        secondResolved = true;
        resolve('Second promise was resolved');
        document.removeEventListener('click', handler);
      }
    }
    document.addEventListener('click', handler);
  });

  secondPromise.then((message) => showNotification(message, true, 'second'));

  // ==== THIRD PROMISE ====
  let leftClicked = false;
  let rightClicked = false;
  let thirdResolved = false;

  const thirdPromise = new Promise((resolve) => {
    document.addEventListener('click', (e) => {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked && !thirdResolved) {
        thirdResolved = true;

        const a = 'Third promise was resolved only after';
        const b = ' both left and right clicks happened';

        setTimeout(() => {
          resolve(`${a}${b}`);
        }, 0);
      }
    });
  });

  thirdPromise.then((message) => showNotification(message, true, 'third'));

  // ==== RIGHT CLICK EMULATION ====
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    const syntheticClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 2,
    });

    e.target.dispatchEvent(syntheticClick);
  });
});
