'use strict';
const body = document.querySelector('body');

function addNotification(type, text) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.innerText = text;
  body.appendChild(notification);
}

const firstPromise = new Promise ((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error ('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise (resolve => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise (resolve => {
  let leftClicked = false;
  let rightClicked = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    };
    if (e.button === 2) {
      rightClicked = true;
    };
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    };
  });
});

firstPromise
  .then(result => {
    addNotification('success', result);
  })
  .catch(error => {
    addNotification('warning', error);
  });

secondPromise
  .then(result => {
    addNotification('success', result);
  });

thirdPromise
  .then(result => {
    addNotification('success', result);
  });
