'use strict';

document.addEventListener('contextmenu', rightClickEvent => {
  rightClickEvent.preventDefault();
});

function createMessage(className, text) {
  const newMessage = document.createElement('div');

  newMessage.innerText = text;
  newMessage.className = className;
  newMessage.dataset.qa = 'notification';

  document.body.append(newMessage);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (clickEvent) => {
    if (clickEvent.button === 1) {
      return;
    }

    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let isRightClick = false;
  let isLeftClick = false;

  document.addEventListener('mousedown', (clickEvent) => {
    if (clickEvent.button === 0) {
      isLeftClick = true;
    }

    if (clickEvent.button === 2) {
      isRightClick = true;
    }

    if (isRightClick && isLeftClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then(result => {
    createMessage('success', result);
  })
  .catch(() => {
    createMessage('warning', 'First promise was rejected');
  });

promise2
  .then(result => {
    createMessage('success', result);
  });

promise3
  .then(result => {
    createMessage('success', result);
  });
