'use strict';

function messageCintainer(message, isError) {
  const divEl = document.createElement('div');

  divEl.classList.add(`${isError ? 'error' : 'success'}`);
  divEl.setAttribute('data-qa', 'notification');
  divEl.textContent = message;
  document.body.appendChild(divEl);
}

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

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((messageText) => {
    messageCintainer(messageText, false);
  })
  .catch((error) => {
    messageCintainer(error.message, true);
  });

secondPromise.then((messageText) => {
  messageCintainer(messageText, false);
});

thirdPromise.then((messageText) => {
  messageCintainer(messageText, false);
});
