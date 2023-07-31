'use strict';

function createMessage(text, isError = false) {
  const messageDiv = document.createElement('div');

  messageDiv.dataset.qa = 'notification';

  if (!isError) {
    messageDiv.classList.add('success');
  } else {
    messageDiv.classList.add('warning');
  }

  messageDiv.textContent = text;
  document.body.appendChild(messageDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', function() {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', function() {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('mousedown', ({ button }) => {
    if (button === 0) {
      leftClick = true;
    }

    if (button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then((success) => {
  createMessage(success);
})
  .catch((error) => {
    createMessage(error, true);
  });

secondPromise.then((result) => {
  createMessage(result);
}).catch((error) => {
  createMessage(error.message, true);
});

thirdPromise.then((message) => {
  createMessage(message);
}).catch((error) => {
  createMessage(error.message, true);
});
