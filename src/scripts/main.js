'use strict';

let leftClicked = false;
let rightClicked = false;
let clicked = false;

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected!'));
    }
  }, 3000);

  document.addEventListener('click', () => {
    clicked = true;
    resolve('First promise was resolved!');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved!');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved!');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClicked = true;

    if (rightClicked && leftClicked) {
      resolve('Third promise was resolved!');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;

    if (rightClicked && leftClicked) {
      resolve('Third promise was resolved!');
    }
  });
});

const showMessage = (text, isError = false) => {
  const wrapper = document.createElement('div');

  wrapper.setAttribute('data-qa', 'notification');

  wrapper.classList.add(isError ? 'error' : 'success');

  wrapper.textContent = text;

  document.body.append(wrapper);
};

firstPromise
  .catch((error) => showMessage(error.message, true))
  .then((message) => showMessage(message));

secondPromise.then((message) => showMessage(message));

thirdPromise.then((message) => showMessage(message));
