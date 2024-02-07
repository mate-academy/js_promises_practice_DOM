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

let documentClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', function() {
    resolve('First promise was resolved');

    documentClicked = true;
  });

  if (!documentClicked) {
    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  }
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', function() {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;

  document.addEventListener('click', function() {
    if (rightClick) {
      resolve('Third promise was resolved');
    } else {
      documentClicked = true;
    }
  });

  document.addEventListener('contextmenu', function() {
    if (documentClicked) {
      resolve('Third promise was resolved');
    } else {
      rightClick = true;
    }
  });
});

firstPromise.then((success) => {
  createMessage(success);
})
  .catch((error) => {
    createMessage(error, true);
  });

secondPromise.then((success) => {
  createMessage(success);
});

thirdPromise.then((success) => {
  createMessage(success);
});
