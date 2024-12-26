'use strict';

// const page = document.querySelector('.logo');
const page = document.body;

const success = (textMessage) => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.setAttribute('class', 'success');

  message.textContent = textMessage;

  document.body.append(message);
};

const error = (textMessage) => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.setAttribute('class', 'error');

  message.textContent = textMessage;

  document.body.append(message);
};

let rightClick = false;
let leftClick = false;

const promise1 = new Promise((resolve, reject) => {
  const handleClick = () => {
    clearTimeout(timeout);
    resolve('First promise was resolved');
  };

  page.addEventListener('click', () => {
    rightClick = true;
    handleClick();
  });

  const timeout = setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then((message) => success(message))
  .catch((errorMessage) => error(errorMessage));

const promise2 = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
  };

  page.addEventListener('click', () => {
    rightClick = true;
    handleClick();
  });

  page.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    leftClick = true;
    handleClick();
  });
});

promise2.then((message) => success(message));

const promise3 = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Third promise was resolved');
  };

  page.addEventListener('click', () => {
    if (leftClick) {
      handleClick();
    }
  });

  page.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (rightClick) {
      handleClick();
    }
  });
});

promise3.then((message) => success(message));
