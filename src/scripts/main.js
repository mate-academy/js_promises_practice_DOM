'use strict';

function showNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message;

  document.body.appendChild(div);

  div.style.transform = 'translateY(-20px)';

  requestAnimationFrame(() => {
    div.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    div.remove();
  }, 3000);
}

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');

      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));

    document.removeEventListener('mousedown', handleClick);
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

document.addEventListener('contextmenu', (e) => e.preventDefault());

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((msg) => showNotification(msg, 'error'));

secondPromise.then((msg) => showNotification(msg, 'success'));

thirdPromise.then((msg) => showNotification(msg, 'success'));
