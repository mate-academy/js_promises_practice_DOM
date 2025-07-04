'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick, rightClick;

  window.addEventListener('mousedown', (e) => {
    leftClick = e.button === 0 || leftClick;
    rightClick = e.button === 2 || rightClick;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (message) => {
  const container = document.createElement('div');

  container.setAttribute('data-qa', 'notification');
  container.classList.add('success');
  container.textContent = message;
  document.body.append(container);
};

const errorHandler = () => {
  const container = document.createElement('div');

  container.setAttribute('data-qa', 'notification');
  container.classList.add('error');
  container.textContent = 'First promise was rejected';
  document.body.append(container);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
