'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;

  document.body.append(notification);
}

window.firstPromise = new Promise((resolve, reject) => {
  const clickHandler = () => {
    clearTimeout(timeoutId);
    document.removeEventListener('click', clickHandler);

    resolve('First promise was resolved');
  };

  const timeoutId = setTimeout(() => {
    document.removeEventListener('click', clickHandler);

    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', clickHandler);
});

window.firstPromise
  .then((message) => showNotification('success', message))
  .catch((error) => showNotification('error', error.message));

window.secondPromise = new Promise((resolve) => {
  const leftClickHandler = () => {
    cleanup();
    resolve('Second promise was resolved');
  };

  const rightClickHandler = (e) => {
    e.preventDefault();
    cleanup();
    resolve('Second promise was resolved');
  };

  function cleanup() {
    document.removeEventListener('click', leftClickHandler);
    document.removeEventListener('contextmenu', rightClickHandler);
  }

  document.addEventListener('click', leftClickHandler);
  document.addEventListener('contextmenu', rightClickHandler);
});

window.secondPromise.then((message) => {
  showNotification('success', message);
});

window.thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const leftClickHandler = () => {
    leftClicked = true;
    checkResolve();
  };

  const rightClickHandler = (e) => {
    e.preventDefault();
    rightClicked = true;
    checkResolve();
  };

  function checkResolve() {
    if (leftClicked && rightClicked) {
      document.removeEventListener('click', leftClickHandler);
      document.removeEventListener('contextmenu', rightClickHandler);

      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', leftClickHandler);
  document.addEventListener('contextmenu', rightClickHandler);
});

window.thirdPromise.then((message) => {
  showNotification('success', message);
});
