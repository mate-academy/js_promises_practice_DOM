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
  document.body.addEventListener('click', (e) => {
    resolve();
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
  document.body.addEventListener('click', (e) => {
    resolve();
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
})
  .then(() => {
    createMessage('success', 'Second promise was resolved');
  });

function createPromise(forEvent) {
  return new Promise((resolve, reject) => {
    document.body.addEventListener(forEvent, (e) => {
      resolve();
    });
  });
}

const promise1 = createPromise('click');
const promise2 = createPromise('contextmenu');

promise1
  .then(() => promise2)
  .then(() => {
    createMessage('success', 'Third promise was resolved');
  });
