
'use strict';

function firstPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });
}

function secondPromise() {
  return new Promise(resolve => {
    document.addEventListener('mousedown', (e) => {
      resolve('Second promise was resolved');
    });
  });
}

function thirdPromise() {
  return new Promise(resolve => {
    let leftBtn = false;
    let rightBtn = false;

    document.addEventListener('mousedown', (e) => {
      switch (e.button) {
        case 0:
          leftBtn = true;
          break;
        case 2:
          rightBtn = true;
          break;
        default:
          throw new Error('Click left or right button');
      }

      if (leftBtn && rightBtn) {
        resolve('Third promise was resolved');
      }
    });
  });
}

firstPromise()
  .then(res => {
    showNotification(res, 'success');
  })
  .catch(err => {
    showNotification(err, 'warning');
  });

secondPromise()
  .then(res => {
    showNotification(res, 'success');
  });

thirdPromise()
  .then(res => {
    showNotification(res, 'success');
  });

function showNotification(message, type) {
  document.body.innerHTML
  += `<div data-qa="notification" class="${type}">${message}</div>`;
};
