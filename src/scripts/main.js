'use strict';

function addElement(message, error = false) {
  const div = document.createElement('div');

  div.classList = !error ? 'success' : 'error';
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    addElement(message);
  })
  .catch((error) => {
    addElement(error, true);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((message) => {
    addElement(message);
  })
  .catch((error) => {
    addElement(error, true);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftMouse = false;
  let rightMouse = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftMouse = true;
    } else if (e.button === 2) {
      rightMouse = true;
    }

    if (leftMouse && rightMouse) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((message) => {
    addElement(message);
  })
  .catch((error) => {
    addElement(error, true);
  });
