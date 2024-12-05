'use strict';

const button = document.querySelector('body');

button.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(reject, 3000);

  button.addEventListener('click', resolve);
});

const secondPromise = new Promise((resolve) => {
  button.addEventListener('mouseup', (e) => {
    switch (e.button) {
      case 0:
        resolve();
        break;
      case 2:
        e.preventDefault();
        resolve();
        break;
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const checkClicks = () => {
    if (leftClick && rightClick) {
      resolve();
    }
  };

  button.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      e.preventDefault();
      rightClick = true;
    }
    checkClicks();
  });
});

firstPromise
  .then(() => {
    const success = document.createElement('div');

    success.className = 'success';
    success.dataset.qa = 'notification';
    success.textContent = 'First promise was resolved';
    document.body.appendChild(success);
  })
  .catch(() => {
    const error = document.createElement('div');

    error.className = 'error';
    error.dataset.qa = 'notification';
    error.textContent = 'First promise was rejected';
    document.body.appendChild(error);
  });

secondPromise.then(() => {
  const success = document.createElement('div');

  success.className = 'success';
  success.dataset.qa = 'notification';
  success.textContent = 'Second promise was resolved';
  document.body.appendChild(success);
});

thirdPromise.then(() => {
  const success = document.createElement('div');

  success.className = 'success';
  success.dataset.qa = 'notification';
  success.textContent = 'Third promise was resolved';
  document.body.appendChild(success);
});
