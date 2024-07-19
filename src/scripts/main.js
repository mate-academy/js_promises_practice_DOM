'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve();
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    document.removeEventListener('click', handleClick);
    // eslint-disable-next-line prefer-promise-reject-errors
    reject();
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve();
    document.removeEventListener('click', handleClick);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    resolve();
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleContextMenu);
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  const handleClick = () => {
    leftClick = true;
    checkBothClicks();
  };

  const handleContextMenu = () => {
    rightClick = true;
    checkBothClicks();
  };

  const checkBothClicks = () => {
    if (leftClick && rightClick) {
      resolve();
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
});

const handle = (msg, type = 'success') => {
  const message = document.createElement('div');

  message.textContent = `${msg} promise was ${type === 'error' ? 'rejected' : 'resolved'}`;
  message.className = type === 'error' ? 'error' : 'success';
  message.dataset.qa = 'notification';
  body.appendChild(message);
};

firstPromise.then(() => handle('First')).catch(() => handle('First', 'error'));
secondPromise.then(() => handle('Second'));
thirdPromise.then(() => handle('Third'));
