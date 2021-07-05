'use strict';

const mainPage = document.querySelector('body');

const firstPromise = new Promise(function(resolve, reject) {
  mainPage.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => reject(new Error('Error')), 3000);
});

firstPromise.then(() => {
  createMessage('First promise was resolved', 'success');
})
  .catch(() => {
    createMessage('First promise was rejected', 'warning');
  });

const secondPromise = new Promise(function(resolve, reject) {
  mainPage.addEventListener('click', () => {
    resolve();
  });

  mainPage.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve();
  });
});

secondPromise.then(() => {
  createMessage('Second promise was resolved', 'success');
});

const thirdPromise = new Promise(function(resolve, reject) {
  let leftClick = false;
  let rightClick = false;

  mainPage.addEventListener('click', () => {
    leftClick = true;
    checkClicks();
  });

  mainPage.addEventListener('contextmenu', () => {
    rightClick = true;
    checkClicks();
  });

  const checkClicks = () => {
    if (leftClick && rightClick) {
      resolve();
    }
  };
});

thirdPromise.then(() => {
  createMessage('Third promise was resolved', 'success');
});

function createMessage(text, type) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.className = type;
  message.innerHTML = text;

  mainPage.append(message);
};
