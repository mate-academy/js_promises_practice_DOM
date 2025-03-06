'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    clearTimeout(timeout);
    resolve(`First promise was resolved`);
  });

  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (ev) => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve(`Second promise was resolved`);
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve(`Third promise was resolved`);
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve(`Third promise was resolved`);
    }
  });
});

function appendMessage(text, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.classList.add('success');

  if (isError) {
    div.classList.add('error');
  }

  div.textContent = text;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => appendMessage(message))
  .catch((error) => appendMessage(error.message, true));

secondPromise.then((message) => appendMessage(message));

thirdPromise
  .then((message) => appendMessage(message))
  .catch((error) => appendMessage(error.message, true));
