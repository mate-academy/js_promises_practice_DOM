'use strict';

const doc = document.querySelector('html');
const body = document.querySelector('body');

// .......... creativeMessage = <div data-qa = 'notification' class  >

const creativeMessage = function (message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  const className = message.includes('resolved') ? 'success' : 'error';

  div.classList.add(className);
  div.textContent = message;

  body.append(div);
};

// //////////////// firstPromise //////////////////////////////////////////////

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const error = 'First promise was rejected';

    reject(error);
  }, 3000);

  doc.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });
});

// /////////////////////////////////////////////////

firstPromise
  .then((data) => {
    creativeMessage(data);
  })
  .catch((error) => {
    creativeMessage(error);
  });
// //////////////////////////////////////////////////////////

// ///////////////////////////////////////////////

const secondPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  doc.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((data) => {
  creativeMessage(data);
});

// //////////////////////////////////////////////////
let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  doc.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((data) => {
  creativeMessage(data);
});

// //////////////////////////////////////////////
