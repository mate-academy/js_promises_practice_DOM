'use strict';

const logoMate = document.querySelector('.logo');

const notification = (message) => {
  const notificationDiv = document.createElement('div');

  notificationDiv.setAttribute('data-qa', 'notification');
  notificationDiv.classList.add('success');
  notificationDiv.textContent = message;

  if (message instanceof Error) {
    notificationDiv.classList.remove('success');
    notificationDiv.classList.add('error');
    notificationDiv.textContent = message.message;
  }

  document.body.append(notificationDiv);
};

const firstPromise = new Promise((resolve, reject) => {
  logoMate.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  document.addEventListener('click', () => {
    left = true;
    checkCondition();
  });

  document.addEventListener('contextmenu', () => {
    right = true;
    checkCondition();
  });

  function checkCondition() {
    if (left === true && right === true) {
      resolve('Third promise was resolved');
    }
  }
});

firstPromise.then(notification).catch(notification);
secondPromise.then(notification);
thirdPromise.then(notification);
