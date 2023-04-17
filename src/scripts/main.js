'use strict';

const handler = (message, type) => {
  const newDiv = document.createElement('div');

  newDiv.dataset.qa = 'notification';
  newDiv.classList.add(type);

  newDiv.innerText = message;

  document.body.append(newDiv);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    const rejectedMessage = 'First promise was rejected';

    reject(rejectedMessage);
  }, 3000);
});

firstPromise
  .then(message => {
    handler(message, 'success');
  })
  .catch(message => {
    handler(message, 'warning');
  });

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
  .then(message => {
    handler(message, 'success');
  });

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('mousedown', (myEvent) => {
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
  .then(message => {
    handler(message, 'success');
  });
