/* eslint-disable prefer-promise-reject-errors */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;
  const handleClick = (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleClick);
  };

  document.addEventListener('click', handleClick);

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    handleClick();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(() => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.textContent = 'First promise was resolved';
    notification.classList.add('success');
    document.body.appendChild(notification);
  })
  .catch(() => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.textContent = 'First promise was rejected';
    notification.classList.add('error');
    document.body.appendChild(notification);
  });

secondPromise.then(() => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = 'Second promise was resolved';
  notification.classList.add('success');
  document.body.appendChild(notification);
});

thirdPromise.then(() => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = 'Third promise was resolved';
  notification.classList.add('success');
  document.body.appendChild(notification);
});
