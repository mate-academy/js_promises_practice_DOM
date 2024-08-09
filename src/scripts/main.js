'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve('First promise was resolved');
  };

  document.addEventListener('click', handleClick, { once: true });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleClick, { once: true });
  document.addEventListener('contextmenu', handleClick, { once: true });
});

const thirdPromise = new Promise((resolve) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  const checkClicks = (leftClick, rightClick) => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', (e) => {
    leftClickHappened = true;

    checkClicks(leftClickHappened, rightClickHappened);
  });

  document.addEventListener('contextmenu', (e) => {
    rightClickHappened = true;

    checkClicks(leftClickHappened, rightClickHappened);
  });
});

const resultHandler = (message, isError = false) => {
  const resultMessage = document.createElement('div');

  resultMessage.dataset.qa = 'notification';
  resultMessage.textContent = message;
  resultMessage.className = isError ? 'error' : 'success';

  document.body.appendChild(resultMessage);
};

firstPromise
  .then((message) => {
    resultHandler(message);
  })
  .catch((error) => {
    resultHandler(error.message, true);
  });

secondPromise.then((message) => {
  resultHandler(message);
});

thirdPromise.then((message) => {
  resultHandler(message);
});
