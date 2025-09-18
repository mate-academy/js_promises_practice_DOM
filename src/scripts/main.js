'use strict';

function showNotification(message, classes) {
  const div = document.createElement('div');

  div.className = classes;
  div.textContent = message;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve();
    clearTimeout(timeoutId);
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener('click', handleClick);

  const timeoutId = setTimeout(() => {
    reject(new Error('Timeout error'));
  }, 3000);
});

firstPromise
  .then(() => {
    showNotification('First promise was resolved', 'message');
  })
  .catch(() => {
    showNotification('First promise was rejected!', 'message');
  });

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleContextMenu);
  };

  const handleContextMenu = () => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleContextMenu);
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
});

secondPromise.then((message) => {
  showNotification(message, 'message');
});

const thirdPromise = new Promise((resolve, reject) => {
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

    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
  };

  thirdPromise.then((message) => {
    showNotification(message, 'message');
  });
});
