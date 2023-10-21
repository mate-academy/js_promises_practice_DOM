'use strict';

const body = document.querySelector('body');

function succesMessage(succesText) {
  const newMessage = document.createElement('div');

  newMessage.classList.add('succes');
  newMessage.dataset.qa = 'notification';
  newMessage.innerText = succesText;
  body.append(newMessage);
}

function errorMessage(errorText) {
  const newMessage = document.createElement('div');

  newMessage.classList.add('warning');
  newMessage.dataset.qa = 'notification';
  newMessage.innerText = errorText;
  body.append(newMessage);
}

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRigthClicked = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isLeftClicked = true;
    }

    if (e.button === 2) {
      isRigthClicked = true;
    }

    if (isLeftClicked && isRigthClicked) {
      resolve('Third promise was resolved');
    }
  });
});

promise1.then(succesMessage).catch(errorMessage);
promise2.then(succesMessage);
promise3.then(succesMessage);
