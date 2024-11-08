'use strict';

let clicks = false;

function createNotification(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  if (message.includes('resolved')) {
    div.classList.add('success');
  }

  if (message.includes('rejected')) {
    div.classList.add('error');
  }

  document.body.appendChild(div);
}

const p1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    clicks = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (clicks === false) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

p1.then((message) => {
  createNotification(message);
}).catch((error) => {
  createNotification(error.message);
});

const p2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

p2.then((message) => {
  createNotification(message);
});

const p3 = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left === true && right === true) {
      resolve('Third promise was resolved');
    }
  });
});

p3.then((message) => {
  createNotification(message);
});
