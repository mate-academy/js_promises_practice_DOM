'use strict';

function handleSuccess(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

function handleError(error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'error';

  div.textContent = error instanceof Error ? error.message : error;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  let isSettled = false;

  const clickHandler = () => {
    if (!isSettled) {
      isSettled = true;
      document.removeEventListener('click', clickHandler);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    if (!isSettled) {
      isSettled = true;
      document.removeEventListener('click', clickHandler);

      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  let isSettled = false;

  const resolveHandler = () => {
    if (!isSettled) {
      isSettled = true;
      document.removeEventListener('click', resolveHandler);
      document.removeEventListener('contextmenu', resolveHandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', resolveHandler);
  document.addEventListener('contextmenu', resolveHandler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;
  let isSettled = false;

  const checkBothEvents = () => {
    if (leftClicked && rightClicked && !isSettled) {
      isSettled = true;

      resolve('Third promise was resolved only after');
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    checkBothEvents();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    checkBothEvents();
  });
});

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess).catch(handleError);
thirdPromise.then(handleSuccess).catch(handleError);
