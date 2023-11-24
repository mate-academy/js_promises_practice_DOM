'use strict';

const RIGHT_CLICK = 'contextmenu';
const LEFT_CLICK = 'click';

const handleClick = (
  eventType, callback
) => document.addEventListener(eventType, callback);

const displayMessage = (text, isError = false) => {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.classList.add(isError ? 'warning' : 'success');
  message.innerHTML = text;
  document.body.appendChild(message);
};

const firstPromise = new Promise((resolve, reject) => {
  handleClick(LEFT_CLICK, resolve);
  setTimeout(() => reject(new Error('error')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  handleClick(RIGHT_CLICK, resolve);
  handleClick(LEFT_CLICK, resolve);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  handleClick(RIGHT_CLICK, () => {
    rightClick = true;

    if (leftClick) {
      resolve();
    }
  });

  handleClick(LEFT_CLICK, () => {
    leftClick = true;

    if (rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => displayMessage('First promise was resolved'))
  .catch(() => displayMessage('First promise was rejected', true));

secondPromise.then(() => displayMessage('Second promise was resolved'));
thirdPromise.then(() => displayMessage('Third promise was resolved'));
