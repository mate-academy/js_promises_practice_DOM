'use strict';

const body = document.querySelector('body');

function message(classMessage, textMessage) {
  const newMessage = document.createElement('div');

  newMessage.classList.add(classMessage);
  newMessage.dataset.qa = 'notification';
  newMessage.innerText = textMessage;
  body.append(newMessage);
}

function createObject(className, text) {
  return {
    classMessage: className,
    textMessage: text,
  };
}

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve(createObject('success', 'First promise was resolved'));
  });

  setTimeout(() => {
    reject(createObject('warning', 'First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve(createObject('success', 'Second promise was resolved'));
    }
  });
});

const promise3 = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  body.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        isLeftClicked = true;
        break;
      case 2:
        isRightClicked = true;
        break;
    }

    if (isLeftClicked && isRightClicked) {
      resolve(createObject('success', 'Third promise was resolved'));
    }
  });
});

promise1
  .then(({ classMessage, textMessage }) => message(classMessage, textMessage))
  .catch(({ classMessage, textMessage }) => message(classMessage, textMessage));

promise2
  .then(({ classMessage, textMessage }) => message(classMessage, textMessage));

promise3
  .then(({ classMessage, textMessage }) => message(classMessage, textMessage));
