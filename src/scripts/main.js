'use strict';

let leftClickOccurred = false;
let rightClickOccurred = false;

const firstPromise = new Promise((resolve, reject) => {
  const handleLeftClick = () => {
    resolve('First promise was resolved on a left click in the document');
    document.removeEventListener('click', handleLeftClick);
  };

  document.addEventListener('click', handleLeftClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
    document.removeEventListener('click', handleLeftClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClickOccurred = true;
    }

    if (e.button === 2) {
      rightClickOccurred = true;
    }

    if (leftClickOccurred && rightClickOccurred) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

function handleSuccess(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('notification', 'success');
  div.textContent = message;
  document.body.appendChild(div);
}

function handleError(error) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('notification', 'error');
  div.textContent = error.message;
  document.body.appendChild(div);
}

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);
