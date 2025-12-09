'use strict';

const handleSuccess = (message) => {
  const newDiv = document.createElement('div');

  newDiv.textContent = message;
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.className = 'success';
  document.body.appendChild(newDiv);
};

const handleError = (errorMessage) => {
  const errorDiv = document.createElement('div');

  errorDiv.setAttribute('data-qa', 'notification');
  errorDiv.className = 'error';
  errorDiv.textContent = errorMessage;
  document.body.appendChild(errorDiv);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('Left click was not detected.'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeoutId);
    resolve();
  });
});

const secondPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  function check() {
    if (isLeftClicked || isRightClicked) {
      return resolve();
    }
  }

  document.addEventListener('click', () => {
    isLeftClicked = true;
    check();
  });

  document.addEventListener('contextmenu', () => {
    isRightClicked = true;
    check();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  function check() {
    if (isLeftClicked && isRightClicked) {
      return resolve();
    }
  }

  document.addEventListener('click', () => {
    isLeftClicked = true;
    check();
  });

  document.addEventListener('contextmenu', () => {
    isRightClicked = true;
    check();
  });
});

firstPromise
  .then(() => {
    handleSuccess('First promise was resolved');
  })
  .catch(() => {
    handleError('First promise was rejected');
  });

secondPromise.then(() => {
  handleSuccess('Second promise was resolved');
});

thirdPromise
  .then(() => {
    handleSuccess('Third promise was resolved');
  })
  .catch(() => {
    handleError('Third promise was rejected');
  });
