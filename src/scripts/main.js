'use strict';

const body = document.querySelector('body');

function createmessage(message, type) {
  const messageAlert = document.createElement('div');

  messageAlert.classList.add(`${type}`);
  messageAlert.setAttribute('data-qa', 'notification');
  messageAlert.textContent = message;
  body.insertAdjacentElement('beforeend', messageAlert);
}

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', (e) => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(Error);
  }, 3000);
});

promise1.then(message => {
  createmessage(message, 'success');
});

promise1.catch(() => {
  createmessage(`First promise was rejected`, 'warning');
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    };
  });
});

promise2.then(message => {
  createmessage(message, 'success');
});

const promise3 = new Promise((resolve) => {
  let firstCondition = false;
  let secondCondition = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      firstCondition = true;
    };

    if (e.button === 2) {
      secondCondition = true;
    };

    if (firstCondition === true && secondCondition === true) {
      resolve(`Third promise was resolved`);
    };
  });
});

promise3.then(message => {
  createmessage(message, 'success');
});
