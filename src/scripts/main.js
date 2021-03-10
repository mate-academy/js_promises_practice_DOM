'use strict';

const body = document.querySelector('body');
const buttonsId = [0, 2];

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  resolve('Second promise was resolved');
});

const thirdPromise = new Promise((resolve) => {
  resolve('Third promise was resolved');
});

firstPromise
  .then((resolveText) => {
    const result = createMessage('success', resolveText);

    body.append(result);
  })
  .catch((errorText) => {
    const result = createMessage('warning', errorText);

    body.append(result);
  });

document.addEventListener('mousedown', (e) => {
  if (!buttonsId.includes(e.button)) {
    return false;
  };

  deactivateBtn(e.button);

  buttonsId.length
    ? secondPromise.then((resolveText) => {
      const result = createMessage('success', resolveText);

      body.append(result);
    })
    : thirdPromise.then((resolveText) => {
      const result = createMessage('success', resolveText);

      body.append(result);
    });
});

function deactivateBtn(btnId) {
  const btnIndex = buttonsId.indexOf(btnId);

  buttonsId.splice(btnIndex, 1);
}

function createMessage(statusMessage, textMessage) {
  const message = document.createElement('DIV');

  message.setAttribute('data-qa', 'notification');
  message.className = statusMessage;
  message.innerText = textMessage;

  return message;
}
