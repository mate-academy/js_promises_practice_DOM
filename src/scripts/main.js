'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () =>
    resolve());

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise.then(() => {
  message('First promise was resolved', 'success');
}).catch(() => {
  message('First promise was rejected', 'warning');
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (el) => {
    if (el.button === 0 || el.button === 2) {
      resolve();
    }
  });
});

secondPromise.then(() => {
  message('Second promise was resolved', 'success');
});

const thirdPromise = new Promise((resolve) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (el) => {
    if (el.button === 0) {
      leftButton = true;
    }

    if (el.button === 2) {
      rightButton = true;
    };

    if (leftButton && rightButton) {
      resolve();
    }
  });
});

thirdPromise.then(() => {
  message('Third promise was resolved', 'success');
});

function message(textMessage, classMessage) {
  const div = document.createElement('div');

  div.classList = classMessage;
  div.dataset.qa = 'notification';
  div.textContent = textMessage;
  document.querySelector('body').append(div);
}
