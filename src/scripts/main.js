'use strict';

const successHandler = (message) => {
  const successDiv = document.createElement('div');

  successDiv.setAttribute('data-qa', 'notification');
  successDiv.className = 'success';
  successDiv.textContent = message;
  document.body.append(successDiv);
};

const failureHandler = (error) => {
  const failureDiv = document.createElement('div');

  failureDiv.setAttribute('data-qa', 'notification');
  failureDiv.className = 'error';
  failureDiv.textContent = error.message;
  document.body.append(failureDiv);
};

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timerId);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  let hasLeft = false;
  let hasRight = false;

  const checkBothClicks = () => {
    if (hasLeft && hasRight) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    hasLeft = true;

    checkBothClicks();
  });

  document.addEventListener('contextmenu', () => {
    hasRight = true;

    checkBothClicks();
  });
});

firstPromise.then(successHandler).catch(failureHandler);
secondPromise.then(successHandler).catch(failureHandler);
thirdPromise.then(successHandler).catch(failureHandler);
