'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', function handleClick(e) {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  });
});

firstPromise
  .then((message) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.classList.add('success');
    notification.textContent = message;
    document.body.appendChild(notification);
  })
  .catch((error) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.classList.add('error');
    notification.textContent = error.message;
    document.body.appendChild(notification);
  });

const secondPromise = new Promise((resolve) => {
  function resolveOnce() {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  function handleLeftClick(e) {
    if (e.button === 0) {
      resolveOnce();
    }
  }

  function handleRightClick() {
    resolveOnce();
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

secondPromise.then((message) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = message;
  document.body.appendChild(notification);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkBothClicked() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
    }
  }

  function handleLeftClick(e) {
    if (e.button === 0) {
      leftClicked = true;
      checkBothClicked();
    }
  }

  function handleRightClick() {
    rightClicked = true;
    checkBothClicked();
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

thirdPromise.then((message) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = message;
  document.body.appendChild(notification);
});
