'use strict';

let countOfMessages = 0;

function addMessage(type, text) {
  const message = document.createElement('div');

  message.className = type;
  message.innerText = text;
  message.style.top = 50 + countOfMessages * 100 + 'px';
  countOfMessages++;
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise.then(() => {
  addMessage('message', 'Promise was resolved!');
},
() => {
  addMessage('message error-message', 'Promise was rejected!');
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

secondPromise.then(() => {
  addMessage('message', 'Second promise was resolved');
});

const thirdPromise = new Promise((resolve) => {
  let firstClickEvent;
  let secondClickEvent;

  document.addEventListener('mousedown', eventClick => {
    const presedButton = eventClick.button;

    if (presedButton !== 1) {
      presedButton === 0
        ? firstClickEvent = true
        : secondClickEvent = true;
    }

    if (firstClickEvent && secondClickEvent) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(() => addMessage('message', 'Third promise was resolved'));
