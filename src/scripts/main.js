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
  const resolver = (success, error) => {
    body.addEventListener('click', () => {
      success(`First promise was resolved`);
    });

    setTimeout(() => {
      error(`First promise was rejected`);
    }, 3000);
  };

  return new Promise(resolver);
};

function createSecondPromise() {
  const resolver = (success) => {
    body.addEventListener('click', () => {
      success(`Second promise was resolved`);
    });

    body.addEventListener('contextmenu', () => {
      success(`Second promise was resolved`);
    });
  };

  return new Promise(resolver);
}

function createThirdPromise() {
  const resolver = (success) => {
    body.addEventListener('click', e => {
      e.target.addEventListener('contextmenu', () => {
        success(`Third promise was resolved`);
      });
    });

    body.addEventListener('contextmenu', e => {
      e.target.addEventListener('click', () => {
        success(`Third promise was resolved`);
      });
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
