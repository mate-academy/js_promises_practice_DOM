'use strict';

// const body = document.querySelector('body');

function generateMessage(textOfMessage, type) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.className = type;
  message.innerText = textOfMessage;
  // body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
    }
  });

  const rejectMessage = 'First promise was rejected';

  if (!clicked) {
    setTimeout(() => reject(rejectMessage), 3000);
  }
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (e.button === -1) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rigthClick = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rigthClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => generateMessage(result, 'success'))
  .catch(error => generateMessage(error, 'warning'));

secondPromise
  .then(result => generateMessage(result, 'success'))
  .catch(error => generateMessage(error, 'warning'));

thirdPromise
  .then(result => generateMessage(result, 'success'))
  .catch(error => generateMessage(error, 'warning'));
