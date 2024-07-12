'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const handleSuccess = (message) => {
    const successDiv = document.createElement('div');

    successDiv.className = 'message success';
    successDiv.textContent = message;
    successDiv.setAttribute('data-qa', 'notification');
    body.appendChild(successDiv);
  };

  const handleError = (error) => {
    const errorDiv = document.createElement('div');

    errorDiv.className = 'message error';
    errorDiv.textContent = error.message;
    errorDiv.setAttribute('data-qa', 'notification');
    body.appendChild(errorDiv);
  };

  const firstPromise = new Promise((resolve, reject) => {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('logo')) {
        resolve('First promise was resolved');
      }
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener('click', (e) => {
      const middle = window.innerWidth / 2;

      if (e.clientX < middle || e.clientX > middle) {
        resolve('Second promise was resolved');
      }
    });
  });

  let leftClicked = false;

  document.addEventListener('click', (e) => {
    if (e.clientX < window.innerWidth / 2) {
      leftClicked = true;
    } else if (e.clientX > window.innerWidth / 2 && leftClicked) {
      thirdPromise.resolve('Third promise was resolved');
    }
  });

  const thirdPromise = new Promise((resolve) => {
    thirdPromise.resolve = resolve;
  });

  firstPromise.then(handleSuccess).catch(handleError);
  secondPromise.then(handleSuccess).catch(handleError);
  thirdPromise.then(handleSuccess).catch(handleError);
});
