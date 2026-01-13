'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function handleClick(eventHundleClick) {
    if (eventHundleClick.button === 0) {
      clearTimeout(timerId);
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  }

  document.addEventListener('click', handleClick);
});

firstPromise
  .then((message) => stringHandler(message, false))
  .catch((message) => stringHandler(message.message, true));

const secondPromise = new Promise((resolve, reject) => {
  function handleLeft(handleEventLeft) {
    if (handleEventLeft.button === 0) {
      finish();
    }
  }

  function handleRight(handleEventRight) {
    handleEventRight.preventDefault();
    finish();
  }

  function finish(eventHundleClick) {
    document.removeEventListener('click', handleLeft);
    document.removeEventListener('contextmenu', handleRight);
    resolve('Second promise was resolved');
  }

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
});

secondPromise
  .then((message) => stringHandler(message, false))
  .catch((message) => stringHandler(message, true));

const thirdPromise = new Promise((resolve, reject) => {
  let leftDone = false;
  let rightDone = false;

  function handleLeft(eventLeft) {
    if (eventLeft.button === 0) {
      leftDone = true;
      checkCompletion();
    }
  }

  function handleRight(eventRight) {
    eventRight.preventDefault();
    rightDone = true;
    checkCompletion();
  }

  function checkCompletion() {
    if (leftDone && rightDone) {
      document.removeEventListener('click', handleLeft);
      document.removeEventListener('contextmenu', handleRight);
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
});

thirdPromise
  .then((message) => stringHandler(message, false))
  .catch((message) => stringHandler(message, true));

function stringHandler(text, isError) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = text;

  if (isError === true) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }

  document.body.append(div);
}
