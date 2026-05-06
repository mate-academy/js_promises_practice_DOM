'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
      clearTimeout(timer);
    }
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const check = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      leftClicked = true;
      check();
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClicked = true;
    check();
  });
});

function successHandler(notification) {
  const message = document.createElement('div');

  message.classList.add('success');
  message.setAttribute('data-qa', 'notification');
  message.textContent = notification;
  document.body.appendChild(message);
}

function errorHandler(notification) {
  const message = document.createElement('div');

  message.classList.add('error');
  message.setAttribute('data-qa', 'notification');
  message.textContent = notification.message || notification;
  document.body.appendChild(message);
}

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
