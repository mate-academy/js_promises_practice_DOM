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

      document.addEventListener(
        'click',
        (e) => {
          if (e.button === 0 && isSettled === false) {
            resolve('First promise was resolved');
            isSettled = true;
          }
        },
        { once: true },
      );

      setTimeout(() => {
        if (!isSettled) {
          reject(new Error('First promise was rejected'));
        }
      }, 3000);
    });

    const result = await firstPromise;

    showMessage(result);
  } catch (error) {
    showMessage(error.message, true);
  }
}

handleFirstPromise();

async function handleSecondPromise() {
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
}

handleSecondPromise();

async function handleThirdPromise() {
  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    });
  });

  const result = await thirdPromise;

  showMessage(result);
}

handleThirdPromise();
