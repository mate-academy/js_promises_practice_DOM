'use strict';

const body = document.querySelector('body');

function createNotification(state, content) {
  const notification = document.createElement('div');

  body.appendChild(notification);
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = content;

  if (state === 'success') {
    notification.classList.add('success');
  } else {
    notification.classList.add('warning');
  }
}

function createFirstPromise() {
  const resolver = (resolve, reject) => {
    body.addEventListener('click', () => {
      resolve(`First promise was resolved`);
    });

    setTimeout(() => {
      reject(`First promise was rejected`);
    }, 3000);
  };

  return new Promise(resolver);
};

function createSecondPromise() {
  const resolver = (resolve) => {
    body.addEventListener('click', () => {
      resolve(`Second promise was resolved`);
    });

    body.addEventListener('contextmenu', () => {
      resolve(`Second promise was resolved`);
    });
  };

  return new Promise(resolver);
}

function createThirdPromise() {
  const resolver = (resolve) => {
    let leftClick = false;
    let rightClick = false;

    body.addEventListener('mousedown', e => {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }
    });

    body.addEventListener('mousedown', () => {
      if (leftClick && rightClick) {
        resolve(`Third promise was resolved`);
      }
    });
  };

  return new Promise(resolver);
}

const firstPromise = createFirstPromise();
const secondPromise = createSecondPromise();
const thirdPromise = createThirdPromise();

firstPromise
  .then(res => {
    createNotification('success', res);
  })
  .catch(fail => {
    createNotification('error', fail);
  });

secondPromise.then(res => {
  createNotification('success', res);
});

thirdPromise.then(res => {
  createNotification('success', res);
});
