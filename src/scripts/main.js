'use strict';

const body = document.querySelector('body');
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
});

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

  document.addEventListener('click', () => {
    resolve(body.appendChild(message));
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(body.appendChild(message));
  });
});

const promise3 = new Promise(resolve => {
  const message = getMessage('success', 'Third promise was resolved');

  document.addEventListener('mousedown', () => {
    if (checkout.LKM && checkout.PKM) {
      checkout.LKM = false;
      checkout.PKM = false;
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
