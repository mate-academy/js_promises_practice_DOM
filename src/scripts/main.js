'use strict';

const createMessage = function(message, statusClass) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = statusClass;
  div.textContent = message;

  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    const mouseButton = e.button;

    if (mouseButton === 0 || mouseButton === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => createMessage(result, `success`))
  .catch(error => createMessage(error, 'warning'));

secondPromise
  .then(result => createMessage(result, 'success'))
  .catch(error => createMessage(error, 'warning'));

thirdPromise
  .then(result => createMessage(result, 'success'))
  .catch(error => createMessage(error, 'warning'));
