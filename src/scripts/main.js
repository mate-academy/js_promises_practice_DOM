'use strict';

const body = document.querySelector('body');

function showNotification(message, result) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(result);
  div.textContent = message;

  body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    body.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });

  body.addEventListener('contextmenu', () => {
    body.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

firstPromise.then((firstResult) => {
  showNotification(firstResult, 'success');
})
  .catch((error) => {
    showNotification(error, 'warning');
  });

secondPromise.then((secondResult) => {
  showNotification(secondResult, 'success');
});

thirdPromise.then((thirdResult) => {
  showNotification(thirdResult, 'success');
});
