'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;

  const handleClick = (e) => {
    if (!isClicked) {
      isClicked = true;
      document.removeEventListener('click', handleClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!isClicked) {
      document.removeEventListener('click', handleClick);
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((msg) => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.classList.add('success');
    message.textContent = msg;
    document.body.appendChild(message);
  })
  .catch((msg) => {
    const message = document.createElement('div');

    message.setAttribute('data-qa', 'notification');
    message.classList.add('error');
    message.textContent = msg;
    document.body.appendChild(message);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((msg) => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add('success');
  message.textContent = msg;
  document.body.appendChild(message);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((msg) => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add('success');
  message.textContent = msg;
  document.body.appendChild(message);
});
