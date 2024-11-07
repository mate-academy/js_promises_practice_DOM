'use strict';

let isClicked = false;

function createMessage(message) {
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
    isClicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (isClicked === false) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

p1.then((message) => {
  createMessage(message);
}).catch((error) => {
  createMessage(error.message);
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
  createMessage(message);
});

const p3 = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

p3.then((message) => {
  createMessage(message);
});
