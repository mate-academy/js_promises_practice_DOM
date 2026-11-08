'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function handleClick(e) {
    if (e.button === 0) {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
      resolve('First promise was resolved');
    }
  }

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  const handleResolve = (e) => {
    if (
      e.type === 'click' ||
      e.type === 'contextmenu' ||
      e.button === 0 ||
      e.button === 2
    ) {
      document.removeEventListener('click', handleResolve);
      document.removeEventListener('contextmenu', handleResolve);
      document.removeEventListener('mousedown', handleResolve);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleResolve);
  document.addEventListener('contextmenu', handleResolve);
  document.addEventListener('mousedown', handleResolve);
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClicked = false;
  let hasRightClicked = false;

  const checkBoth = () => {
    if (hasLeftClicked && hasRightClicked) {
      document.removeEventListener('click', handleLeft);
      document.removeEventListener('contextmenu', handleRight);
      document.removeEventListener('mousedown', handleMousedown);
      resolve('Third promise was resolved');
    }
  };

  const handleLeft = () => {
    hasLeftClicked = true;
    checkBoth();
  };

  const handleRight = () => {
    hasRightClicked = true;
    checkBoth();
  };

  const handleMousedown = (e) => {
    if (e.button === 0) {
      hasLeftClicked = true;
    } else if (e.button === 2) {
      hasRightClicked = true;
    }
    checkBoth();
  };

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
  document.addEventListener('mousedown', handleMousedown);
});

const handleSuccess = (text) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'success';
  notification.textContent = text;
  document.body.append(notification);
};

const handleError = (error) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = 'error';
  notification.textContent = error.message;
  document.body.append(notification);
};

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess).catch(handleError);
thirdPromise.then(handleSuccess).catch(handleError);
