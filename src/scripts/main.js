'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved on a left click in the document');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);
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

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved only after both');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved only after both');
    }
  });
});

const createMessage = (message, isError = false) => {
  const div = document.createElement('div');

  div.classList.add('notification');

  if (isError) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }

  div.textContent = message;
  div.setAttribute('data-qa', 'notification');
  document.body.appendChild(div);
};

const successHandler = (message) => {
  createMessage(message);
};

const errorHandler = (error) => {
  createMessage(error.message, true);
};

firstPromise.then(successHandler).catch(errorHandler);

secondPromise.then(successHandler).catch(errorHandler);

thirdPromise.then(successHandler).catch(errorHandler);
