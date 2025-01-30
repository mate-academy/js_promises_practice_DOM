'use strict';

const errorElement = document.querySelector('.error');

errorElement.style.opacity = 0;

const successElement = document.querySelector('.success');

successElement.style.opacity = 0;

let leftClick = false;
let rightClick = false;

function displayMessage(message) {
  const div = document.createElement('div');

  div.textContent = message;
  document.body.appendChild(div);
}

const leftClickPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    const error = new Error('No left click within 3 seconds');

    document.querySelector('div').textContent =
      'No left click within 3 seconds';
    document.querySelector('div').style.opacity = 1;
    reject(error);
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeout);
      leftClick = true;
      displayMessage('First promise was resolved');
      resolve();
    },
    { once: true },
  );
});

const rightClickPromise = new Promise((resolve) => {
  const handleClick = () => {
    displayMessage('Second promise was resolved');
    resolve();
    // Remove the event listeners after resolving the promise
    document.removeEventListener('contextmenu', handleClick);
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener(
    'contextmenu',
    () => {
      handleClick();
    },
    { once: true },
  );

  document.addEventListener('click', handleClick, { once: true });
});

const bothClicksPromise = new Promise((resolve) => {
  function checkBothClicks() {
    if (leftClick && rightClick) {
      displayMessage('Third promise was resolved');
      resolve();
    }
  }

  document.addEventListener('click', () => {
    leftClick = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
    checkBothClicks();
  });
});

leftClickPromise
  .then(() => {
    successElement.textContent = 'First promise resolved';
    successElement.style.opacity = 1;
  })
  .catch((error) => {
    errorElement.textContent = error;
    errorElement.style.opacity = 1;
  });

rightClickPromise
  .then(() => {
    successElement.textContent = 'Second promise resolved';
    successElement.style.opacity = 1;
  })
  .catch((error) => {
    errorElement.textContent = error;
    errorElement.style.opacity = 1;
  });

bothClicksPromise
  .then(() => {
    successElement.textContent = 'Third promise resolved';
    successElement.style.opacity = 1;
  })
  .catch((error) => {
    errorElement.textContent = error;
    errorElement.style.opacity = 1;
  });
