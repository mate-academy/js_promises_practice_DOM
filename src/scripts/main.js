'use strict';

function addMessage(text, elClass) {
  const div = document.createElement('div');

  div.classList.add(elClass);
  div.setAttribute('data-qa', 'notification');

  div.textContent = text;

  document.body.append(div);
}

document.addEventListener('contextmenu', (e) => e.preventDefault());

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', function () {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', function (e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => addMessage(message, 'success'))
  .catch((error) => addMessage(error.message, 'error'));
secondPromise.then((message) => addMessage(message, 'success'));
thirdPromise.then((message) => addMessage(message, 'success'));
