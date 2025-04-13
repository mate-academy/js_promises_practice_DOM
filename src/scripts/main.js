'use strict';

const promise1 = new Promise((resolve, reject) => {
  const handleLeftClick = (e) => {
    if (e.button === 0) {
      document.removeEventListener('click', handleLeftClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handleLeftClick);

  setTimeout(() => {
    document.removeEventListener('click', handleLeftClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handleClick);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const promise3 = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleClicks = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handleClicks);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleClicks);

  document.addEventListener('contextmenu', (e) => e.preventDefault());
});

const successHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;
  document.body.appendChild(div);
};

const errorHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = message;
  document.body.appendChild(div);
};

promise1.then(successHandler).catch(errorHandler);
promise2.then(successHandler);
promise3.then(successHandler);
