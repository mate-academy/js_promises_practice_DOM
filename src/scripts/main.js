'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  const handleClick = (e) => {
    if (e.button === 0) {
      clearTimeout(timeout);
      document.removeEventListener('click', handleClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  const handleResolve = (e) => {
    if (e.button === 0 || e.button === 2 || e.type === 'contextmenu') {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleResolve);
      document.removeEventListener('contextmenu', handleResolve);
    }
  };

  document.addEventListener('click', handleResolve);
  document.addEventListener('contextmenu', handleResolve);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleClicks = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2 || e.type === 'contextmenu') {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleClicks);
      document.removeEventListener('contextmenu', handleClicks);
    }
  };

  document.addEventListener('click', handleClicks);
  document.addEventListener('contextmenu', handleClicks);
});

function showSuccess(message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add('success');
  notification.textContent = message;

  document.body.append(notification);
}

function showError(error) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add('error');
  notification.textContent = error.message;

  document.body.append(notification);
}

firstPromise.then(showSuccess).catch(showError);
secondPromise.then(showSuccess).catch(showError);
thirdPromise.then(showSuccess).catch(showError);
