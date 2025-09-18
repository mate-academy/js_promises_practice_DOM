'use strict';

function showNotification(message, classes) {
  const div = document.querySelector('div[data-qa="notification"]');

  if (div) {
    div.className = classes;
    div.textContent = message;
  } else {
    const newDiv = document.createElement('div');

    newDiv.setAttribute('data-qa', 'notification');
    newDiv.className = classes;
    newDiv.textContent = message;
    document.body.append(newDiv);

    setTimeout(() => newDiv.remove(), 3000);
  }
}

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve('First promise was resolved on left click');
    clearTimeout(timeoutId);
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener('click', handleClick);

  const timeoutId = setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected after 3 seconds'));
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
  const handleClick = () => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleContextMenu);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleContextMenu);
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
});

secondPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((error) => {
    showNotification(error.message, 'error');
  });

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleClick = () => {
    leftClicked = true;
    checkClicks();
  };

  const handleContextMenu = () => {
    rightClicked = true;
    checkClicks();
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

thirdPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((message) => {
    showNotification(message, 'error');
  });
