'use strict';

function createSuccess(message) {
  const divSuccess = document.createElement('div');

  divSuccess.textContent = message;
  divSuccess.setAttribute('data-qa', 'notification');
  divSuccess.classList.add('success');
  document.body.appendChild(divSuccess);
}

function createError(message) {
  const divError = document.createElement('div');

  divError.textContent = message;
  divError.setAttribute('data-qa', 'notification');
  divError.classList.add('error');
  document.body.appendChild(divError);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => createSuccess(message))
  .catch((error) => createError(error));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => createSuccess(message));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkBothClicks();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;
    checkBothClicks();
  });

  function checkBothClicks() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }
});

thirdPromise.then((message) => createSuccess(message));
