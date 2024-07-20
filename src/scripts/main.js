'use strict';

const newMessage = (innerText, type) => {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.innerText = innerText;
  message.classList.add(type);

  document.body.append(message);

  return message;
};

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve('First promise was resolved');
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('contextmenu', handleClick);

  document.addEventListener('click', handleClick);
});
const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  const checkClicks = (rightClick1, leftClick1) => {
    if (rightClick1 && leftClick1) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClick = true;

    checkClicks(rightClick, leftClick);
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    checkClicks(rightClick, leftClick);
  });
});

firstPromise.then(
  (message) => {
    newMessage(message, 'success');
  },
  (error) => {
    newMessage(error, 'error');
  },
);

secondPromise.then((message) => {
  newMessage(message, 'success');
});

thirdPromise.then((message) => {
  newMessage(message, 'success');
});
