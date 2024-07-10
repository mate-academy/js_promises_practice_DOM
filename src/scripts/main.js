'use strict';

let documentLeftClick = false;
let documentRightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    documentLeftClick = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    documentLeftClick = true;
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    documentRightClick = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    if (documentRightClick && documentLeftClick) {
      resolve('Third promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (documentRightClick && documentLeftClick) {
      resolve('Third promise was resolved');
    }
  });
});

function appendMsg(classTitle) {
  return function (message) {
    document.body.appendChild(createNotificationMsg(message, classTitle));
  };
}

const successMsg = appendMsg('success');
const errorMsg = appendMsg('error');

firstPromise.then(successMsg).catch(errorMsg);
secondPromise.then(successMsg);
thirdPromise.then(successMsg);

function createNotificationMsg(msg, classResult) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className += ` ${classResult}`;
  div.textContent = msg;

  return div;
}
