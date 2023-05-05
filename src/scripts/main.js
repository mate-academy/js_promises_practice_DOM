'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('context menu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;
    rightClicked === true && resolve('Third promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    leftClicked === true && resolve('Third promise was resolved');
  });
});

const resultFunction = (className, type) => {
  const newDiv = document.createElement('div');

  document.body.appendChild(newDiv);
  newDiv.setAttribute('class', className);
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.appendChild(document.createTextNode(type));
};

const successHandler = (success) => resultFunction('success', success);
const errorHandler = (error) => resultFunction('warning', error);

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler, errorHandler);
thirdPromise.then(successHandler, errorHandler);
