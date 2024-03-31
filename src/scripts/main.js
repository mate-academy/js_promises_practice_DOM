'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => reject(new Error()), 3000);
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
  let rightClick = false;
  let leftClick = false;
  document.addEventListener('click', () => {
    if (rightClick) {
      resolve();
    }

    leftClick = true;
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (leftClick) {
      resolve();
    }

    rightClick = true;
  });
});

function createMessage(text, className) {
  const messageElement = document.createElement('div');

  messageElement.setAttribute('data-qa', 'notification');
  messageElement.classList.add(className);
  messageElement.innerText = text;

  return messageElement;
}

firstPromise
  .then(() => {
    document.body.append(
      createMessage('First promise was resolved', 'success'),
    );
  })
  .catch(() => {
    document.body.append(createMessage('First promise was rejected', 'error'));
  });

secondPromise.then(() => {
  document.body.append(createMessage('Second promise was resolved', 'success'));
});

thirdPromise.then(() => {
  document.body.append(createMessage('Third promise was resolved', 'success'));
});
