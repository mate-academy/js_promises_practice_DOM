'use strict';

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('something bad happened'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve();
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve();
    });
  });
});

firstPromise
  .then(() => {
    displayNotification('First promise was resolved', 'success');
  })
  .catch(() => {
    displayNotification('First promise was rejected', 'warning');
  });

secondPromise.then(() => {
  displayNotification('Second promise was resolved', 'success');
});

thirdPromise.then(() => {
  displayNotification('Third promise was resolved', 'success');
});

function displayNotification(message, type) {
  const div = document.createElement('div');

  div.classList.add(type);
  div.textContent = message;
  div.dataset.qa = 'notification';

  document.querySelector('body').append(div);
}
