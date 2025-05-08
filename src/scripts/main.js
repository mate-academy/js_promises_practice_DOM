'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const handleClick = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
});

firstPromise
  .then((message) => {
    document.body.innerHTML += `<div data-qa="notification" class="success">${message}</div>`;
  })
  .catch((error) => {
    document.body.innerHTML += `<div data-qa="notification" class="error">${error.message}</div>`;
  });

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

secondPromise.then((message) => {
  document.body.innerHTML += `<div data-qa="notification" class="success">${message}</div>`;
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightButton = false;
  let leftButton = false;
  let resolveStatus = false;

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton && !resolveStatus) {
      resolve('Third promise was resolved');
      resolveStatus = true;

      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('contextmenu', preventContextMenu);
    }
  };

  const preventContextMenu = (e) => e.preventDefault();

  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('contextmenu', preventContextMenu);
});

thirdPromise
  .then((message) => {
    document.body.innerHTML += `<div data-qa="notification" class="success">${message}</div>`;
  })
  .catch((message) => {
    document.body.innerHTML += `<div data-qa="notification" class="error">${message}</div>`;
  });
