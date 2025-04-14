'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const onMouseDown = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', onMouseDown);
});

const secondPromise = new Promise((resolve, reject) => {
  const onMouseDown = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const onMouseDown = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

const handleSuccess = (message) => {
  const div = document.createElement('div');

  div.className = 'message success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.appendChild(div);
};

const handleError = (error) => {
  const div = document.createElement('div');

  div.className = 'message error-message';
  div.setAttribute('data-qa', 'notification');
  div.textContent = error.message || 'Promise was rejected!';
  document.body.appendChild(div);
};

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess).catch(handleError);
thirdPromise.then(handleSuccess).catch(handleError);
