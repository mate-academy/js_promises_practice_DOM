'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  const firstPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);

    body.addEventListener('click', () => {
      clearTimeout(timer);
      resolve('First promise was resolved');
    });
  });

  firstPromise.then(successHandler).catch(errorHandler);

  const secondPromise = new Promise((resolve) => {
    body.addEventListener('click', (e) => {
      resolve('Second promise was resolved');
    });

    body.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      resolve('Second promise was resolved');
    });
  });

  secondPromise.then(successHandler);

  const thirdPromise = new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    const checkBoth = () => {
      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    };

    const onLeftClick = () => {
      leftClick = true;
      checkBoth();
    };

    const onRightClick = (e) => {
      e.preventDefault();
      rightClick = true;
      checkBoth();
    };

    body.addEventListener('click', onLeftClick);
    body.addEventListener('contextmenu', onRightClick);
  });

  thirdPromise.then(successHandler);

  function successHandler(result) {
    const div = document.createElement('div');

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');
    div.textContent = result;

    document.body.appendChild(div);
  }

  function errorHandler(error) {
    const div = document.createElement('div');

    div.classList.add('error');
    div.setAttribute('data-qa', 'notification');
    div.textContent = error.message;

    document.body.appendChild(div);
  }
});
