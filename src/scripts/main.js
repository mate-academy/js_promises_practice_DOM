'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButtonClicked = false;
  let rightButtonClicked = false;

  document.addEventListener('click', () => {
    leftButtonClicked = true;

    if (leftButtonClicked && rightButtonClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightButtonClicked = true;

    if (leftButtonClicked && rightButtonClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => success(result))
  .catch(errorMassage => error(errorMassage));

secondPromise.then(result => success(result));
thirdPromise.then(result => success(result));

function success(resultMassage) {
  newMessage('success', resultMassage);
}

function error(errorMassage) {
  newMessage('warning', errorMassage);
}

function newMessage(classMessage, message) {
  const divMessage = document.createElement('div');

  divMessage.className = classMessage;
  divMessage.textContent = message;
  divMessage.dataset.qa = 'notification';
  document.body.append(divMessage);
}
