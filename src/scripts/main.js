'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

function newMessage(text, className, classModificator) {
  const divMessage = document.createElement('div');

  divMessage.className = className;
  divMessage.classList.add(classModificator);
  divMessage.textContent = text;
  document.body.append(divMessage);
}

promise1
  .then((text) => {
    newMessage(`${text}`, 'success', 'success--1');
  })
  .catch((text) => {
    newMessage(`${text}`, 'warning');
  });

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
});

promise2
  .then((text) =>
    newMessage(`${text}`, 'success', 'success--2'));

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise3
  .then((text) =>
    newMessage(`${text}`, 'success', 'success--3')
  );
