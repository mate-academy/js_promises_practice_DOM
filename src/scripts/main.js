'use strict';

function showNotification(message, type) {
  const newDiv = document.createElement('div');

  newDiv.dataset.qa = 'notification';
  newDiv.classList.add(type);
  newDiv.textContent = message;
  document.body.appendChild(newDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  function onDocumentClick(e) {
    if (e.button === 0) {
      clearTimeout(timerId);
      resolve('First promise was resolved');
      document.removeEventListener('click', onDocumentClick);
    }
  }

  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', onDocumentClick);
  }, 3000);

  document.addEventListener('click', onDocumentClick);
});

firstPromise
  .then((messageFromResolve) => {
    showNotification(messageFromResolve, 'success');
  })
  .catch((errorFromReject) => {
    showNotification(errorFromReject.message, 'error');
  });

const secondPromise = new Promise((resolve, reject) => {
  function handleLeftClick(e) {
    if (e.button === 0) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
    }
  }

  function handleRightClick(e) {
    e.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

secondPromise.then((messageFromResolve) => {
  showNotification(messageFromResolve, 'success');
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkLeftClick(e) {
    if (e.button === 0) {
      leftClicked = true;

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', checkLeftClick);
        document.removeEventListener('contextmenu', checkRightClick);
      }
    }
  }

  function checkRightClick(e) {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', checkLeftClick);
      document.removeEventListener('contextmenu', checkRightClick);
    }
  }

  document.addEventListener('click', checkLeftClick);
  document.addEventListener('contextmenu', checkRightClick);
});

thirdPromise.then((messageFromResolve) => {
  showNotification(messageFromResolve, 'success');
});
