'use strict';

const MESSAGE_CLASS = 'success';
const ERROR_MESSAGE_CLASS = 'error';

const createElementMessage = (className, message) => {
  const div = document.createElement('div');

  div.className = className;
  div.textContent = message;
  div.setAttribute('data-qa', 'notification');

  return div;
};

const addMessage = (selector, text) => {
  document.body.appendChild(createElementMessage(selector, text));
};

let resolveFirstPromise;

let timeoutId;
const firstPromise = new Promise((resolve, reject) => {
  timeoutId = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  resolveFirstPromise = resolve;
});

firstPromise
  .then((message) => {
    addMessage(MESSAGE_CLASS, message);
  })
  .catch((error) => {
    addMessage(ERROR_MESSAGE_CLASS, error.message);
    cleanup();
  });

let resolveSecondPromise;
const secondPromise = new Promise((resolve) => {
  resolveSecondPromise = resolve;
});

secondPromise.then((message) => {
  addMessage(MESSAGE_CLASS, message);
});

let resolveThirdPromise;
const thirdPromise = new Promise((resolve) => {
  resolveThirdPromise = resolve;
});

thirdPromise.then((message) => {
  addMessage(MESSAGE_CLASS, message);
  cleanup();
});

let leftClick, rightClick, secondResolved, thirdResolved;

const resolveSecond = () => {
  if (!secondResolved) {
    resolveSecondPromise('Second promise was resolved');
    secondResolved = true;
  }
};

const resolveThird = () => {
  if (!thirdResolved && rightClick && leftClick) {
    thirdResolved = true;
    resolveThirdPromise('Third promise was resolved');
  }
};

const handleDocumentLeftClick = (e) => {
  if (e.button === 0) {
    clearTimeout(timeoutId);
    resolveFirstPromise('First promise was resolved');
    resolveSecond();
    leftClick = true;
    resolveThird();
  }
};

const handleDocumentRightClick = (e) => {
  e.preventDefault();
  resolveSecond();
  rightClick = true;
  resolveThird();
};

const cleanup = () => {
  document.removeEventListener('click', handleDocumentLeftClick);
  document.removeEventListener('contextmenu', handleDocumentRightClick);
};

document.addEventListener('click', handleDocumentLeftClick);
document.addEventListener('contextmenu', handleDocumentRightClick);
