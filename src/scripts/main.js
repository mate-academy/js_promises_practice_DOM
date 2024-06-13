'use strict';

const handleResult = (message, newClass) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  div.classList.add(newClass);
  div.innerHTML = message;
  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;
    checkClick();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    checkClick();
  });

  const checkClick = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };
});

firstPromise
  .then((message) => handleResult(message, 'success'))
  .catch((message) => handleResult(message, 'error'));

secondPromise.then((message) => handleResult(message, 'success'));

thirdPromise.then((message) => handleResult(message, 'success'));
