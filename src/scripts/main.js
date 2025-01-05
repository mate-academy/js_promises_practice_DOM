'use strict';

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve('First promise was resolved');
    logo.removeEventListener('click', handleClick);
  };

  logo.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
    logo.removeEventListener('click', handleClick);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    logo.removeEventListener('contextmenu', handleContextMenu);
  };

  logo.addEventListener('click', handleClick);
  logo.addEventListener('contextmenu', handleContextMenu);
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  const handleClick = () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      logo.removeEventListener('click', handleClick);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      logo.removeEventListener('contextmenu', handleContextMenu);
    }
  };

  logo.addEventListener('click', handleClick);
  logo.addEventListener('contextmenu', handleContextMenu);
});

firstPromise
  .then((msg) => addMessage(msg, 'success'))
  .catch((error) => addMessage(error.message, 'error'));

secondPromise.then((msg) => addMessage(msg, 'success'));

thirdPromise
  .then((msg) => addMessage(msg, 'success'))
  .catch((error) => addMessage(error.message, 'error'));

function addMessage(text, className) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(className);
  div.textContent = text;
  document.body.appendChild(div);
}
