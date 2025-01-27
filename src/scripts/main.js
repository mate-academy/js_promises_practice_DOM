'use strict';

function addMessage(text, isResolve) {
  const message = document.createElement('div');

  if (isResolve) {
    message.classList.add('success');
  } else {
    message.classList.add('error');
  }

  message.dataset.qa = 'notification';
  message.textContent = text;
  document.body.prepend(message);
}

const promise1 = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      cleanup();
    }
  };

  const cleanup = () => {
    document.removeEventListener('click', handleClick);
  };

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    cleanup();
  }, 3000);

  document.addEventListener('click', handleClick);
});

promise1
  .then((message) => addMessage(message, true))
  .catch((error) => addMessage(error, false));

const promise2 = new Promise((resolve) => {
  const handleEvent = (e) => {
    if (e.button === 0 || e.type === 'contextmenu') {
      resolve('Second promise was resolved');
      cleanup();
    }
  };

  const cleanup = () => {
    document.removeEventListener('click', handleEvent);
    document.removeEventListener('contextmenu', handleEvent);
  };

  document.addEventListener('click', handleEvent);
  document.addEventListener('contextmenu', handleEvent);
});

promise2.then((message) => addMessage(message, true));

const promise3 = new Promise((resolve) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  const handleLeftClick = () => {
    leftClickHappened = true;
    checkBothEvents();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    rightClickHappened = true;
    checkBothEvents();
  };

  const checkBothEvents = () => {
    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
      cleanup();
    }
  };

  const cleanup = () => {
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

promise3.then((message) => addMessage(message, true));
