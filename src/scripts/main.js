'use strict';

function showMessage(text, isError = false) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');

  if (isError) {
    message.classList.add('error');
  } else {
    message.classList.add('success');
  }
  message.textContent = text;
  document.body.appendChild(message);
}

async function handleFirstPromise() {
  try {
    const firstPromise = new Promise((resolve, reject) => {
      let isSettled = false;
      const timeoutId = setTimeout(() => {
        if (!isSettled) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('First promise was rejected');
        }
      }, 3000);

      document.addEventListener(
        'mousedown',
        (e) => {
          if (e.button === 0 && isSettled === false) {
            resolve('First promise was resolved');
            isSettled = true;
            clearTimeout(timeoutId);
          }
        },
        { once: true },
      );
    });

    const result = await firstPromise;

    showMessage(result);
  } catch (error) {
    showMessage(error, true);
  }
}

handleFirstPromise();

async function handleSecondPromise() {
  try {
    const secondPromise = new Promise((resolve) => {
      document.addEventListener(
        'mousedown',
        (e) => {
          if (e.button === 0 || e.button === 2) {
            resolve('Second promise was resolved');
          }
        },
        { once: true },
      );
    });

    const result = await secondPromise;

    showMessage(result);
  } catch (err) {
    showMessage(err, true);
  }
}

handleSecondPromise();

async function handleThirdPromise() {
  try {
    const thirdPromise = new Promise((resolve) => {
      let leftClicked = false;
      let rightClicked = false;

      document.addEventListener('mousedown', function handler(e) {
        if (e.button === 0) {
          leftClicked = true;
        }

        if (e.button === 2) {
          rightClicked = true;
        }

        if (leftClicked && rightClicked) {
          document.removeEventListener('mousedown', handler);
          resolve('Third promise was resolved');
        }
      });
    });

    const result = await thirdPromise;

    showMessage(result);
  } catch (err) {
    showMessage(err, true);
  }
}

handleThirdPromise();
