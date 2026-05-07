'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  function checkClicks() {
    if (rightClick === true && leftClick === true) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();

    rightClick = true;

    checkClicks();
  });

  document.addEventListener('click', () => {
    leftClick = true;

    checkClicks();
  });
});

function createMessage(text, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = text;

  body.append(div);
}

firstPromise
  .then((message) => {
    createMessage(message, 'success');
  })
  .catch((error) => {
    createMessage(error.message, 'error');
  });

secondPromise.then((message) => {
  createMessage(message, 'success');
});

thirdPromise.then((message) => {
  createMessage(message, 'success');
});
