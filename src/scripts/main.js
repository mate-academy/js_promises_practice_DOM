'use strict';

const notification = document.createElement('div');

document.body.appendChild(notification);

let isResolved = false;
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (!isResolved) {
      isResolved = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!isResolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});
const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.buttons === 1 || e.buttons === 2) {
      resolve('Second promise was resolved');
    }
  });
});
const thirdPromise = new Promise((resolve, reject) => {
  let leftPressed = false;
  let rightPressed = false;

  document.addEventListener('mousedown', (e) => {
    if (e.buttons === 1) {
      leftPressed = true;
    } else if (e.buttons === 2) {
      rightPressed = true;
    }

    if (leftPressed && rightPressed) {
      resolve('Third promise was resolved');
    }
  });
});

function promises() {
  firstPromise
    .then((result) => {
      notification.textContent = result;
      notification.classList.add('success');
    })
    .catch((error) => {
      notification.textContent = error.message;
      notification.classList.add('error');
    });

  secondPromise.then((result) => {
    notification.textContent = result;
    notification.classList.add('success');
  });

  thirdPromise
    .then((result) => {
      notification.textContent = result;
      notification.classList.add('success');
    })
    .catch((error) => {
      notification.textContent = error.message;
      notification.classList.add('error');
    });
}

promises();
