'use strict';

const body = document.querySelector('body');
let leftClicked = false;
let rightClicked = false;

const showMessage = (args) => {
  const [promiseNumber, promiseStatus] = args;
  const message = document.createElement('div');

  promiseStatus === 'resolved'
    ? message.className = 'success'
    : message.className = 'warning';

  message.textContent = `${promiseNumber} promise was ${promiseStatus}`;
  message.dataset.qa = 'notification';

  body.append(message);
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve(['First', 'resolved']);
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  body.addEventListener('click', () => {
    resolve(['Second', 'resolved']);
  });

  body.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();
    resolve(['Second', 'resolved']);
  });
});

const thirdPromise = new Promise(resolve => {
  body.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve(['Third', 'resolved']);
    }
  });

  body.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve(['Third', 'resolved']);
    }
  });
});

firstPromise
  .then(showMessage)
  .catch(() => showMessage(['First', 'rejected']));

secondPromise
  .then(showMessage);

thirdPromise
  .then(showMessage);
