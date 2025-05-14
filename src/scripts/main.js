'use strict';

window.addEventListener('contextmenu', (e) => e.preventDefault());

function notification(text, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'error' : 'success';
  div.innerText = text;

  document.body.appendChild(div);
}

let firstHandled = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      if (!firstHandled) {
        firstHandled = true;

        resolve('First promise was resolved');
      }
    },
    { once: true },
  );

  setTimeout(() => {
    if (!firstHandled) {
      firstHandled = true;

      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');

      document.removeEventListener('mousedown', onClick);
    }
  };

  document.addEventListener('mousedown', onClick);
});

let clickedLeft = false;
let clickedRight = false;

const thirdPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0) {
      clickedLeft = true;
    }

    if (e.button === 2) {
      clickedRight = true;
    }

    if (clickedLeft && clickedRight) {
      resolve('Third promise was resolved');

      document.removeEventListener('mousedown', onClick);
    }
  };

  document.addEventListener('mousedown', onClick);
});

firstPromise
  .then((message) => {
    notification(message);
  })
  .catch((error) => {
    notification(error.message, true);
  });

secondPromise
  .then((message) => {
    notification(message);
  })
  .catch((error) => {
    notification(error.message, true);
  });

thirdPromise
  .then((message) => {
    notification(message);
  })
  .catch((error) => {
    notification(error.message, true);
  });
