'use strict';

const successHandler = (messageText) => {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.className = 'success';
  message.textContent = messageText;

  document.body.append(message);
};

const errorHandler = (messageText) => {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.className = 'error';
  message.textContent = messageText;

  document.body.append(message);
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
  const handleClick = (clickEvent) => {
    if (clickEvent.type === 'contextmenu') {
      clickEvent.preventDefault();
    }

    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let rightEvent = false;
  let leftEvent = false;

  document.addEventListener('click', () => {
    leftEvent = true;

    if (leftEvent && rightEvent) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();

    rightEvent = true;

    if (leftEvent && rightEvent) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(successHandler).catch(errorHandler);

secondPromise.then(successHandler).catch(errorHandler);

thirdPromise.then(successHandler).catch(errorHandler);
