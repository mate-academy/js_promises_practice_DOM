'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  // eslint-disable-next-line prefer-promise-reject-errors
  setTimeout(() => reject('First promise was rejected'), 3000);
});

const secondPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const resolveClicks = () => {
    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClick = true;
    resolveClicks();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    resolveClicks();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const resolveClicks = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClick = true;
    resolveClicks();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    resolveClicks();
  });
});

const successHandler = (message) => {
  const div = document.createElement('div');

  div.classList.add('message', 'success');
  div.dataset.qa = 'notification';
  div.textContent = message;

  body.append(div);
};

const errorHandler = (message) => {
  const div = document.createElement('div');

  div.classList.add('message', 'error');
  div.dataset.qa = 'notification';
  div.textContent = message;

  body.append(div);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
