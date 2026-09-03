'use strict';

function showSuccess(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = message;

  document.body.append(div);
}

function showError(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = message;

  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timerID = setTimeout(() => {
    document.removeEventListener('click', onDocumentClick);

    reject(new Error('First promise was rejected'));
  }, 3000);

  function onDocumentClick(e) {
    if (e.button === 0) {
      clearTimeout(timerID);

      document.removeEventListener('click', onDocumentClick);

      resolve('First promise was resolved');
    }
  }
  document.addEventListener('click', onDocumentClick);
});

const secondPromise = new Promise((resolve) => {
  function onLeftClick(e) {
    if (e.button === 0) {
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('contextmenu', onRightClick);

      resolve('Second promise was resolved');
    }
  }

  function onRightClick(e) {
    document.removeEventListener('click', onLeftClick);
    document.removeEventListener('contextmenu', onRightClick);

    resolve('Second promise was resolved');
  }

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

const thirdPromise = new Promise((resolve) => {
  let hasrightClick = false;
  let hasLeftClick = false;

  function checkBothClicks() {
    if (hasLeftClick === true && hasrightClick === true) {
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('contextmenu', onRightClick);

      resolve('Third promise was resolved');
    }
  }

  function onLeftClick(e) {
    if (e.button === 0) {
      hasLeftClick = true;
      checkBothClicks();
    }
  }

  function onRightClick(e) {
    if (e.button === 2) {
      hasrightClick = true;
      checkBothClicks();
    }
  }

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

firstPromise
  .then((message) => {
    showSuccess(message);
  })
  .catch((error) => {
    showError(error.message);
  });

secondPromise
  .then((message) => {
    showSuccess(message);
  })
  .catch((error) => {
    showError(error.message);
  });

thirdPromise
  .then((message) => {
    showSuccess(message);
  })
  .catch((error) => {
    showError(error.message);
  });
