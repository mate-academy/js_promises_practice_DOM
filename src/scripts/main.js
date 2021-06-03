'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    const message = getMessage('success', 'First promise was resolved');

    resolve(message);
  });

  setTimeout(() => {
    const message = getMessage('warning', 'First promise was rejected');

    reject(message);
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  const message = getMessage('success', 'Second promise was resolved');

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(message);
    }
  });
});

const promise3 = new Promise(resolve => {
  const message = getMessage('success', 'Third promise was resolved');
  const checkout = {
    LKM: false,
    PKM: false,
  };

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      checkout.LKM = true;
    } else if (e.button === 2) {
      checkout.PKM = true;
    }

    if (checkout.LKM && checkout.PKM) {
      resolve(message);
    }
  });
});

function getMessage(word, phrase) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.setAttribute('class', `${word}`);
  message.innerText = phrase;

  return message;
}

promise1
  .then(result => body.appendChild(result))
  .catch(error => body.appendChild(error));
promise2.then(result => body.appendChild(result));
promise3.then(result => body.appendChild(result));
