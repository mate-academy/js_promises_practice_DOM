'use strict';

function createMessage(text, className = 'success') {
  const div = document.createElement('div');

  div.classList = className;
  div.setAttribute('data-qa', 'notification');
  div.textContent = text;
  document.body.append(div);
}

function addClickHandlers(mouseClick) {
  document.addEventListener('click', mouseClick);
  document.addEventListener('contextmenu', mouseClick);
}

function removeClickHandlers(mouseClick) {
  document.removeEventListener('click', mouseClick);
  document.removeEventListener('contextmenu', mouseClick);
}

// First Promise
const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
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

// Second Promise
const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      removeClickHandlers(handleClick);
    }
  };

  addClickHandlers(handleClick);
});

// Third Promise
const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const handleClick = (e) => {
    if (e.button === 2) {
      e.preventDefault();
      rightClick = true;
    } else if (e.button === 0) {
      leftClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      removeClickHandlers(handleClick);
    }
  };

  addClickHandlers(handleClick);
});

// Handlers
firstPromise
  .then((text) => createMessage(text))
  .catch((text) => createMessage(text, 'error'));

secondPromise.then((text) => createMessage(text));

thirdPromise.then((text) => createMessage(text));
