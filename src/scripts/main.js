'use strict';

function messageContent(type, text) {
  const createdElement = document.createElement('div');

  createdElement.setAttribute('data-qa', 'notification');
  createdElement.setAttribute('class', type);
  createdElement.textContent = text;
  document.body.append(createdElement);
}

const script = document.querySelector('script');

script.setAttribute('type', 'module');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    messageContent('success', 'First promise was resolved');
  })
  .catch((error) => {
    messageContent('error', error.message);
  });

secondPromise.then(() => {
  messageContent('success', 'Second promise was resolved');
});

thirdPromise.then(() => {
  messageContent('success', 'Third promise was resolved');
});
