'use strict';
function showNotification(message, isError = false) {
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);
}


let firstClickHandled = false;

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      firstClickHandled = true;
      resolve('First promise was resolved on a left click in the document');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    if (!firstClickHandled) {
      reject('First promise was rejected in 3 seconds if not clicked');
      document.removeEventListener('click', handleClick);
    }
  }, 3000);
});

firstPromise.then(msg => showNotification(msg)).catch(err => showNotification(err, true));


const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      if (e.button === 2) e.preventDefault(); // prevent context menu
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
});

secondPromise.then(msg => showNotification(msg));


let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 2) e.preventDefault(); // prevent context menu

    if (e.button === 0) leftClicked = true;
    if (e.button === 2) rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved only after both left and right clicks happened');
      document.removeEventListener('click', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
});

thirdPromise.then(msg => showNotification(msg));

