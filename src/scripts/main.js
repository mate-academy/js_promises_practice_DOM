'use strict';

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  leftClick.then(() => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  Promise.any([leftClick, rightClick]).then(() => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([leftClick, rightClick]).then(() => {
    resolve('Third promise was resolved');
  });
});

function createNotification(message, typeMessage) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  div.className = typeMessage;
  document.body.appendChild(div);
}

function giveAdvice() {
  const resultFirstPromise = firstPromise;
  const resultSecondPromise = secondPromise;
  const resultThirdPromise = thirdPromise;

  resultFirstPromise.then((resolveMessage) => {
    createNotification(resolveMessage, 'success');
  });

  resultFirstPromise.catch((rejectMessage) => {
    createNotification(rejectMessage.message, 'error');
  });

  resultSecondPromise.then((resolveMessage) => {
    createNotification(resolveMessage, 'success');
  });

  resultThirdPromise.then((resolveMessage) => {
    createNotification(resolveMessage, 'success');
  });
}

giveAdvice();
