'use strict';

function showNotification(massage, isError = false) {
  const div = document.createElement('div');

  div.classList.add('notification');

  div.dataset.qa = 'notification';

  div.classList.add(isError ? 'error' : 'success');
  div.textContent = massage;

  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const click = () => {
    clicked = true;
    resolve('First promise was resolved');
  };

  document.addEventListener('click', click, { once: true });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((message) => {
    showNotification(message);
  })
  .catch((error) => {
    showNotification(error.message, true);
  });

const secondPromise = new Promise((resolve, reject) => {
  const handler = (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler, { once: true });
});

secondPromise
  .then((message) => {
    showNotification(message);
  })
  .catch((error) => {
    showNotification(error.message, true);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;
  const chekClick = () => {
    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }
    chekClick();
  });
});

thirdPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error.message, true));
