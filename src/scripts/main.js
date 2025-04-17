'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const onMouseDown = (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', onMouseDown);
});

const secondPromise = new Promise((resolve) => {
  const onMouseDown = (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

const thirdPromise = new Promise((resolve) => {
  let leftClickDown = false;
  let rightClickDown = false;

  const onMouseDown = (ev) => {
    if (ev.button === 0) {
      leftClickDown = true;
    } else if (ev.button === 2) {
      rightClickDown = true;
    }

    if (leftClickDown && rightClickDown) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

function successHandler(message) {
  const div = document.createElement('div');

  div.className = 'message success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.append(div);
}

function errorHandler(message) {
  const div = document.createElement('div');

  div.className = 'message error';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.append(div);
}

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
