'use strict';

function appendMessage(type, text) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = text;

  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const onClick = () => {
    resolve();
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', onClick);
  }, 3000);
});

firstPromise.then(() => appendMessage('success', 'First promise was resolved'));
firstPromise.catch((error) => appendMessage('error', error.message));

const secondPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    resolve();
    document.removeEventListener('click', onClick);
  };
  const onContextMenu = () => {
    resolve();
    document.removeEventListener('contextmenu', onContextMenu);
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onContextMenu);
});

secondPromise.then(() => {
  appendMessage('success', 'Second promise was resolved');
});

const promiseLeftClick = new Promise((resolve, reject) => {
  const onClick = () => {
    resolve();
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('click', onClick);
});

const promiseRightClick = new Promise((resolve, reject) => {
  const onClick = () => {
    resolve();
    document.removeEventListener('contextmenu', onClick);
  };

  document.addEventListener('contextmenu', onClick);
});

Promise.all([promiseLeftClick, promiseRightClick]).then(() => {
  appendMessage('success', 'Third promise was resolved');
});
