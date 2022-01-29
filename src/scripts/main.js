'use strict';

function addLeftClickEvent(resolve, msg) {
  document.addEventListener('click', () => {
    resolve(msg);
  });
}

function addRightClickEvent(resolve, msg) {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(msg);
  });
}

const promise1 = new Promise((resolve, reject) => {
  addLeftClickEvent(resolve, 'First promise was resolved');

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  addRightClickEvent(resolve, 'Second promise was resolved');
  addLeftClickEvent(resolve, 'Second promise was resolved');
});

const promise3 = new Promise((resolve) => {
  addLeftClickEvent(resolve, 'Go check right click');
});

const rightClickPromise = new Promise((resolve) => {
  addRightClickEvent(resolve, 'Third promise was resolved');
});

promise3
  .then(() => rightClickPromise)
  .then((msg) => showMessage(msg))
  .catch((e) => showError(e));

promise1
  .then((msg) => showMessage(msg))
  .catch((e) => showError(e));

promise2
  .then((value) => showMessage(value))
  .catch((e) => showError(e));

function showMessage(text) {
  const message = document.createElement('div');

  message.className = 'success';
  message.dataset.qa = 'notification';
  message.textContent = text;
  document.body.append(message);
}

function showError(error) {
  const message = document.createElement('div');

  message.className = 'warning';
  message.dataset.qa = 'notification';
  message.textContent = error.message;
  document.body.append(message);
}
