'use strict';

(() => {
  const body = document.querySelector('body');

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  const notification = (parentNode, classes, text) => {
    const node = document.createElement('div');

    node.classList.add(...classes);
    node.textContent = text;
    node.dataset.qa = 'notification';
    parentNode.append(node);
  };

  const firstPromise = new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    const handleClick = (e) => {
      e.preventDefault();

      resolve('Second promise was resolved');
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleClick);
  });

  const thirdPromise = new Promise((resolve) => {
    let isResolved = false;
    let left = false;
    let right = false;

    const checkCLicks = () => {
      if (left && right && !isResolved) {
        isResolved = true;

        resolve('Third promise was resolved');
      }
    };

    document.addEventListener('click', () => {
      left = true;
      checkCLicks();
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      right = true;

      checkCLicks();
    });
  });

  firstPromise
    .then((res) => notification(body, ['success'], res))
    .catch((_err) => notification(body, ['error'], _err.message));

  secondPromise
    .then((res) => notification(body, ['success'], res))
    .catch((_err) => notification(body, ['error'], _err.message));

  thirdPromise
    .then((res) => notification(body, ['success'], res))
    .catch((_err) => notification(body, ['error'], _err.message));
})();
