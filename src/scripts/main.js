'use strict';

'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const handleLeftClick = () => {
    clearTimeout(timeoutId);
    document.removeEventListener('click', handleLeftClick);
    resolve('First promise was resolved');
  };

  document.addEventListener('click', handleLeftClick);

  const timeoutId = setTimeout(() => {
    document.removeEventListener('click', handleLeftClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const cleanUpListeners = () => {
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  };

  const handleLeftClick = () => {
    cleanUpListeners();
    resolve('Second promise was resolved');
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    cleanUpListeners();
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClicked = false;
  let hasRightClicked = false;

  const checkBothClicks = () => {
    if (hasLeftClicked && hasRightClicked) {
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
      resolve('Third promise was resolved');
    }
  };

  const handleLeftClick = () => {
    hasLeftClicked = true;
    checkBothClicks();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    hasRightClicked = true;
    checkBothClicks();
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const successHandler = (message) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = message;
  document.body.appendChild(div);
};

const errorHandler = (error) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = error.message || error;
  document.body.appendChild(div);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
