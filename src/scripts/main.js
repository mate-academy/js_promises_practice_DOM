'use strict';

const body = document.querySelector('body');

firstPromise()
  .then(message => body.appendChild(message))
  .catch(error => body.appendChild(error));

secondPromise()
  .then(message => body.appendChild(message));

thirdPromise()
  .then(message => body.appendChild(message));

function firstPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('mousedown', () => {
      resolve(createMessage('First promise was resolved', 'success'));
    });

    setTimeout(() => {
      reject(createMessage('First promise was rejected', 'warning'));
    }, 3000);
  });
}

function secondPromise() {
  return new Promise(resolve => {
    document.addEventListener('mousedown', ev => {
      if (ev.button === 0 || ev.button === 2) {
        resolve(createMessage('Second promise was resolved', 'success'));
      }
    });
  });
}

function thirdPromise() {
  return new Promise(resolve => {
    let leftClicked = false;
    let rightClicked = false;

    document.addEventListener('mousedown', ev => {
      if (ev.button === 0) {
        leftClicked = true;
      }

      if (ev.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve(createMessage('Third promise was resolved', 'success'));
      }
    });
  });
}

function createMessage(text, eventClass) {
  const div = document.createElement('div');

  div.textContent = text;
  div.classList.add(eventClass);
  div.setAttribute('data-qa', 'notification');

  return div;
}
