'use strict';

const handlePromise = (className, message) => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.classList.add(className);
  element.textContent = message;
  document.body.append(element);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (mouseEvent) => {
    mouseEvent.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;
  const resolveThirdPromise = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClick = true;
    resolveThirdPromise();
  });

  document.addEventListener('contextmenu', (mouseEvent) => {
    mouseEvent.preventDefault();
    rightClick = true;
    resolveThirdPromise();
  });
});

[firstPromise, secondPromise, thirdPromise].forEach((promise) => {
  promise
    .then((message) => handlePromise('success', message))
    .catch((message) => handlePromise('error', message));
});
