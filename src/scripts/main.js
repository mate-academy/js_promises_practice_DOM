'use strict';

function showNotification(isResolved, promiseNumber) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');

  if (isResolved) {
    message.classList.add('success');

    message.textContent = `${promiseNumber} promise was resolved`;
  } else {
    message.classList.add('error');
    message.textContent = `${promiseNumber} promise was rejected`;
  }

  document.body.append(message);
}

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Third promise was resolved');
  });
});

const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error());
  }, 3000);

  document.addEventListener('click', () => {
    resolve();

    clearTimeout(timeoutId);
  });
});

const secondPromise = Promise.any([leftClick, rightClick]);

const thirdPromise = Promise.all([leftClick, rightClick]);

firstPromise
  .then(() => {
    showNotification(true, 'First');
  })
  .catch(() => {
    showNotification(false, 'First');
  });

secondPromise.then(() => {
  showNotification(true, 'Second');
});

thirdPromise.then(() => {
  showNotification(true, 'Third');
});
