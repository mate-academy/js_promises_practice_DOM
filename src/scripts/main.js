'use strict';

const createMessage = (classname, description) => {
  let messagesBox = document.querySelector('.messages');

  if (!messagesBox) {
    messagesBox = document.createElement('div');
    messagesBox.className = 'messages';
    document.body.appendChild(messagesBox);
  }

  const message = document.createElement('p');

  message.className = classname;
  message.innerHTML = description;
  message.dataset.qa = 'notification';
  messagesBox.appendChild(message);
};

new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', (e) => {
    resolve();
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
})
  .then(() => {
    createMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    createMessage('warning', 'First promise was rejected');
  });

new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve();
    }
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
})
  .then(() => {
    createMessage('success', 'Second promise was resolved');
  });

new Promise((resolve, reject) => {
  let leftButtonClicked = false;
  let rightButtonClicked = false;

  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButtonClicked = true;
    } else if (e.button === 2) {
      rightButtonClicked = true;
    }

    if (leftButtonClicked && rightButtonClicked) {
      resolve();
    }
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
})
  .then(() => {
    createMessage('success', 'Third promise was resolved');
  });
