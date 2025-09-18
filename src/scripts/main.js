'use strict';

function showNotification(message, classes) {
  let div = document.querySelector('div[data-qa="notification"]');

  if (!div) {
    div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    document.body.append(div);

    div.className = classes;
    div.textContent = message;
    setTimeout(() => div.remove(), 3000);
  }
}

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);

  const timeoutId = setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    }
  };

  const handleContextMenu = (e) => {
    if (e.button === 2) {
      e.preventDefault();
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
});

secondPromise.then((message) => {
  showNotification(message, 'success');
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkClicks();
    }
  };

  const handleContextMenu = (e) => {
    if (e.button === 2) {
      e.preventDefault();
      rightClicked = true;
      checkClicks();
    }
  };

  const checkClicks = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
});

thirdPromise.then((message) => {
  showNotification(message, 'success');
});
