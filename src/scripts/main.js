'use strict';

function createMessage(message, messageClass) {
  let newMess = message;

  if (messageClass === 'error') {
    newMess = 'First promise was rejected';
  };

  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${messageClass}">
      ${newMess}
    </div>
  `);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.buttons === 1) {
      resolve('First promise was resolved');
    };
  });

  setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightButton = true;

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    };

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then(success => createMessage(success, 'success'))
  .catch(Err => createMessage(Err, 'error'));

promise2
  .then(success => createMessage(success, 'success'))
  .catch(Err => createMessage(Err, 'error'));

promise3
  .then(success => createMessage(success, 'success'))
  .catch(Err => createMessage(Err, 'error'));
