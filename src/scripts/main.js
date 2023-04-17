'use strict';

const successHandler = (message) => {
  const newDiv = document.createElement('div');

  newDiv.dataset.qa = 'notification';
  newDiv.classList.add('success');

  newDiv.innerText = message;

  document.body.append(newDiv);
};

const errorHandler = (message) => {
  const newDiv = document.createElement('div');

  newDiv.dataset.qa = 'notification';
  newDiv.classList.add('warning');

  newDiv.innerText = message;

  document.body.append(newDiv);
};

const firstPromise = new Promise((resolve, reject) => {
  // let eventOccurred = false;

  document.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    const rejectedMessage = 'First promise was rejected';

    reject(rejectedMessage);
  }, 3000);
});

firstPromise
  .then(successHandler)
  .catch(errorHandler);

const secondPromise = new Promise((resolve) => {
  function clickHandler(newEvent) {
    if (newEvent.button === 0 || newEvent.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

secondPromise
  .then(successHandler);

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('mousedown', (myEvent) => {
    myEvent.preventDefault();

    if (myEvent.button === 0) {
      leftClick = true;
    }

    if (myEvent.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(successHandler);
