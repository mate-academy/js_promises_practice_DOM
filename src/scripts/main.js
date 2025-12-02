'use strict';

function showNotification(type, message) {
  const box = document.createElement('div');

  box.setAttribute('data-qa', 'notification');
  box.classList.add(type);
  box.textContent = message;
  document.body.appendChild(box);
}

function handlePromise(promise) {
  return promise
    .then((msg) => {
      showNotification('success', msg);
    })
    .catch((err) => {
      showNotification('error', err.message);
    });
}

const firstPromise = new Promise(function (resolve, reject) {
  const listener = (e) => {
    if (e.button === 0) {
      document.removeEventListener('mousedown', listener);
      resolve(`First promise was resolved`);
    }
  };

  document.addEventListener('mousedown', listener);

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise(function (resolve, reject) {
  const listener = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', listener);
      resolve(`Second promise was resolved`);
    }
  };

  document.addEventListener('mousedown', listener);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function clickedTwoTimes(e) {
    if (e.type === 'click' && e.button === 0) {
      leftClicked = true;
    }

    if ((e.type === 'click' && e.button === 2) || e.type === 'contextmenu') {
      rightClicked = true;

      if (e.type === 'contextmenu') {
        e.preventDefault();
      }
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickedTwoTimes);
      document.removeEventListener('contextmenu', clickedTwoTimes);
    }
  }
  document.addEventListener('click', clickedTwoTimes);
  document.addEventListener('contextmenu', clickedTwoTimes);
});

document.addEventListener('DOMContentLoaded', () => {
  handlePromise(firstPromise);
  handlePromise(secondPromise);
  handlePromise(thirdPromise);
});
