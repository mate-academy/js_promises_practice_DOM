'use strict';

const successHandler = (message) => {
  const successMessage = document.createElement('div');

  successMessage.className = 'success';
  successMessage.setAttribute('data-qa', 'notification');
  successMessage.textContent = message;
  document.body.appendChild(successMessage);
};

const errorHandler = (message) => {
  const errorMessage = document.createElement('div');

  errorMessage.className = 'error';
  errorMessage.setAttribute('data-qa', 'notification');
  errorMessage.textContent = message;
  document.body.appendChild(errorMessage);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve(`First promise was resolved`);
    },
    { once: true },
  );

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve(`Second promise was resolved`);
  };

  document.addEventListener('click', handleClick, { once: true });
  document.addEventListener('contextmenu', handleClick, { once: true });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;
  const handleRightClick = () => {
    rightClicked = true;
    checkBothClicked();
  };
  const handleLeftClick = () => {
    leftClicked = true;
    checkBothClicked();
  };

  const checkBothClicked = () => {
    if (leftClicked && rightClicked) {
      resolve(`Third promise was resolved`);

      document.addEventListener('contextmenu', handleRightClick, {
        once: true,
      });
      document.addEventListener('click', handleLeftClick, { once: true });
    }
  };

  document.addEventListener('contextmenu', handleRightClick);
  document.addEventListener('click', handleLeftClick);
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
