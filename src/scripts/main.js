'use strict';

document.addEventListener('contextmenu', (e) => e.preventDefault());

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', onClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onMouseDownSecond = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onMouseDownSecond);
    }
  };

  document.addEventListener('mousedown', onMouseDownSecond);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkResolve = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onRightClick);
    }
  };

  const onClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkResolve();
    }
  };

  const onRightClick = (e) => {
    e.preventDefault();
    rightClicked = true;
    checkResolve();
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onRightClick);
});

function showSuccess(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;
  document.body.appendChild(div);
}

function showError(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise.then(showSuccess).catch((error) => showError(error.message));
secondPromise.then(showSuccess);
thirdPromise.then(showSuccess);
