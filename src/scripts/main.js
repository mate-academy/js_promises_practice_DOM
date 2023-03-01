'use strict';

const createMessage = (text, type) => {
  const newMessage = document.createElement('div');

  newMessage.dataset.qa = 'notification';

  newMessage.className = `message ${type}`;

  newMessage.textContent = text;

  document.body.append(newMessage);
};

const firstPromise = new Promise((resolve, reject) => {
  let click = false;

  document.addEventListener('click', e => {
    click = true;

    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (click === false) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', e => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let clickLeft = false;
  let clickRight = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      clickLeft = true;
    }

    if (e.button === 2) {
      clickRight = true;
    }

    if (clickLeft && clickRight) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => createMessage(result, 'success'))
  .catch(error => createMessage(error, 'warning'));

secondPromise
  .then(result => createMessage(result, 'success'));

thirdPromise
  .then(result => createMessage(result, 'success'));
