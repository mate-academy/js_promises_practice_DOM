'use strict';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  const promise1 = new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });

  const promise2 = new Promise((resolve) => {
    document.addEventListener('mousedown', () => {
      resolve('Second promise was resolved');
    });
  });

  const promise3 = new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        leftClick = true;
      }

      if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    });
  });

  const handleSuccess = (message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'success';
    div.textContent = message;
    document.body.appendChild(div);
  };

  const handleError = (error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'error';
    div.textContent = error.message;
    document.body.appendChild(div);
  };

  promise1.then(handleSuccess);
  promise1.catch(handleError);
  promise2.then(handleSuccess);
  promise2.catch(handleError);
  promise3.then(handleSuccess);
  promise3.catch(handleError);
});
