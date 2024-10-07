'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let click = false;

  document.addEventListener('click', () => {
    click = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!click) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

function addMessage(message, error = false) {
  const div = document.createElement('div');

  if (error === false) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  document.body.appendChild(div);
}

firstPromise
  .then((message) => addMessage(message, true))
  .catch((error) => addMessage(error.message));

secondPromise.then((message) => addMessage(message, true));
thirdPromise.then((message) => addMessage(message, true));
