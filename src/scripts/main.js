'use strict';

function createMessage(textMessage) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = textMessage;
  document.body.appendChild(div);
}

function addClickHandlers(mouseClick) {
  document.addEventListener('click', mouseClick);
  document.addEventListener('contextmenu', mouseClick);
}

function removeClickHandlers(mouseClick) {
  document.removeEventListener('click', mouseClick);
  document.removeEventListener('contextmenu', mouseClick);
}

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
      removeClickHandlers(handleClick);
    }
  };

  addClickHandlers(handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    removeClickHandlers(handleClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
      removeClickHandlers(handleClick);
    }
  };

  addClickHandlers(handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handleClick = (ev) => {
    if (ev.button === 2) {
      ev.preventDefault();
      rightClick = true;
    } else if (ev.button === 0) {
      leftClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      removeClickHandlers(handleClick);
    }
  };

  addClickHandlers(handleClick);
});

firstPromise
  .then((textMessage) => createMessage(textMessage))
  .catch((textMessage) => createMessage(textMessage));

secondPromise.then((textMessage) => createMessage(textMessage));

thirdPromise.then((textMessage) => createMessage(textMessage));
