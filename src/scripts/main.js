'use strict';

// write your code here
const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    document.removeEventListener('click', handleClick);
    clearTimeout(timerID);
    resolve('First promise was resolved');
  };

  document.addEventListener('click', handleClick);

  const timerID = setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleEvent = () => {
    document.removeEventListener('click', handleEvent);
    document.removeEventListener('contextmenu', handleEvent);
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleEvent);
  document.addEventListener('contextmenu', handleEvent);
});

function createEventPromise(eventName) {
  return new Promise((resolve) => {
    const handleEvent = () => {
      document.removeEventListener(eventName, handleEvent);
      resolve();
    };

    document.addEventListener(eventName, handleEvent);
  });
}

const leftClick = createEventPromise('click');
const rightClick = createEventPromise('contextmenu');

const thirdPromise = Promise.all([leftClick, rightClick]).then(() => {
  return 'Third promise was resolved';
});

function handlePromise(promise) {
  promise
    .then((message) => {
      createMessage('success', message);
    })
    .catch((err) => {
      createMessage('error', err.message);
    });
}

function createMessage(type, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.innerText = message;

  document.body.appendChild(div);
}

handlePromise(firstPromise);
handlePromise(secondPromise);
handlePromise(thirdPromise);
