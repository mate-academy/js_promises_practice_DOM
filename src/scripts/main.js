'use strict';

function addMessage(text, style) {
  const message = document.createElement('div');

  message.classList = style;
  message.innerText = text;
  message.setAttribute('data-qa', 'notification');
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise(resolve => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    addMessage(`First promise was resolved`, 'success');
  })
  .catch(() => {
    addMessage(`First promise was rejected`, 'warning');
  });

secondPromise
  .then(() => {
    addMessage(`Second promise was resolved`, 'success');
  });

thirdPromise
  .then(() => {
    addMessage('Third promise was resolved', 'success');
  });
