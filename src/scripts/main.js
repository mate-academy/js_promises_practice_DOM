'use strict';

function addPromises() {
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  const firstPromise = new Promise((resolve, reject) => {
    function firstClickHandler(e) {
      if (e.button === 0) {
        clearTimeout(timerId);
        document.removeEventListener('mousedown', firstClickHandler);
        resolve('First promise was resolved');
      }
    }

    const timerId = setTimeout(() => {
      document.removeEventListener('mousedown', firstClickHandler);
      reject(new Error('First promise was rejected'));
    }, 3000);

    document.addEventListener('mousedown', firstClickHandler);
  });

  const secondPromise = new Promise((resolve, reject) => {
    function secondClickHandler(e) {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
        document.removeEventListener('mousedown', secondClickHandler);
      }
    }

    document.addEventListener('mousedown', secondClickHandler);
  });

  const thirdPromise = new Promise((resolve, reject) => {
    let leftClicked = false;
    let rightClicked = false;

    function thirdClickHandler(e) {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        document.removeEventListener('mousedown', thirdClickHandler);
      }
    }

    document.addEventListener('mousedown', thirdClickHandler);
  });

  function handlerSuccess(message) {
    const div = document.createElement('div');

    div.className = 'success';
    div.textContent = message;
    div.setAttribute('data-qa', 'notification');

    document.body.appendChild(div);
  }

  function handlerError(error) {
    const div = document.createElement('div');

    div.className = 'error';
    div.textContent = error.message;
    div.setAttribute('data-qa', 'notification');

    document.body.appendChild(div);
  }

  firstPromise.then(handlerSuccess).catch(handlerError);
  secondPromise.then(handlerSuccess).catch(handlerError);
  thirdPromise.then(handlerSuccess).catch(handlerError);
}

addPromises();
