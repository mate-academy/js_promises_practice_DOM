'use strict';

function message(text, type) {
  const notification = document.createElement('div');

  notification.classList.add(type);
  notification.innerText = text;
  notification.dataset.qa = 'notification';

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    const button = e.button;

    if (button === 0 || button === 1 || button === 2) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    const button = e.button;

    if (button === 0 || button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftButtonClicked = false;
  let isRightButtonClicked = false;

  document.addEventListener('mousedown', (e) => {
    const button = e.button;

    if (button === 0) {
      isLeftButtonClicked = !isLeftButtonClicked;
    }

    if (button === 2) {
      isRightButtonClicked = !isRightButtonClicked;
    }

    if (isRightButtonClicked && isLeftButtonClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    message('First promise was resolved', 'success');
  })
  .catch(() => {
    message('First promise was rejected', 'warning');
  });

secondPromise
  .then(() => {
    message('Second promise was resolved', 'success');
  });

thirdPromise
  .then(() => {
    message('Third promise was resolved', 'success');
  });
