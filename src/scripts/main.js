'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  const timeoutID = setTimeout(() => {
    document.removeEventListener('mousedown', clickLeftHandler);
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  const clickLeftHandler = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutID);
      document.removeEventListener('mousedown', clickLeftHandler);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickLeftHandler);
});

const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', clickHandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

const thirdPromise = new Promise((resolve) => {
  const clickState = {
    leftClick: false,
    rightClick: false,
  };

  const clickHandler = (e) => {
    if (e.button === 0) {
      clickState.leftClick = true;
    }

    if (e.button === 2) {
      clickState.rightClick = true;
    }

    if (clickState.leftClick && clickState.rightClick) {
      document.removeEventListener('mousedown', clickHandler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

function createMessage(messageText, isError = false) {
  if (!body) {
    return;
  }

  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  const addedClass = !isError ? 'success' : 'error';

  div.classList.add(addedClass);
  div.textContent = messageText;

  body.append(div);
}

firstPromise
  .then((messageText) => {
    createMessage(messageText, false);
  })
  .catch((error) => {
    createMessage(error, true);
  });

secondPromise
  .then((messageText) => {
    createMessage(messageText, false);
  })
  .catch((error) => {
    createMessage(error.message, true);
  });

thirdPromise
  .then((messageText) => {
    createMessage(messageText, false);
  })
  .catch((error) => {
    createMessage(error.message, true);
  });
