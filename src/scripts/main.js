'use strict';

const createDiv = (type, text) => {
  const message = document.createElement('div');

  message.className = `${type}`;
  message.classList.add('message');
  message.setAttribute('data-qa', 'notification');
  message.innerText = text;

  document.body.append(message);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(resolve => createDiv('success1', resolve),
    reject => createDiv('warning', reject)
  );

secondPromise
  .then(resolve => createDiv('success2', resolve));

thirdPromise
  .then(resolve => createDiv('success3', resolve));
