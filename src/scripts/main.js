'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let leftClick = false;
  let rightClick = false;

  const firstPromise = new Promise((resolve, reject) => {
    const clickHandler = (e) => {
      if (e.button === 0) {
        resolve('First promise was resolved');
      }
    };

    document.addEventListener('click', clickHandler);

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', clickHandler);
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    const clickHandler = (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    };

    document.addEventListener('mousedown', clickHandler);
  });

  const thirdPromise = new Promise((resolve) => {
    const clickHandler = (e) => {
      if (e.button === 0) {
        leftClick = true;
      } else if (e.button === 2) {
        rightClick = true;
      }

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
        leftClick = false;
        rightClick = false;
      }
    };

    document.addEventListener('mousedown', clickHandler);
  });

  const handleSuccess = (message) => {
    const div = document.createElement('div');

    div.className = 'notification success';
    div.setAttribute('data-qa', 'notification');
    div.innerText = message;
    document.body.appendChild(div);
  };

  const handleError = (error) => {
    const div = document.createElement('div');

    div.className = 'notification error';
    div.setAttribute('data-qa', 'notification');
    div.innerText = error.message;
    document.body.appendChild(div);
  };

  firstPromise.then(handleSuccess).catch(handleError);
  secondPromise.then(handleSuccess).catch(handleError);
  thirdPromise.then(handleSuccess).catch(handleError);
});
