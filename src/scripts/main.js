'use strict';

const doc = document;
const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const click = () => {
    clearTimeout(timeOut);
    doc.removeEventListener('click', click);
    resolve('First promise was resolved');
  };

  doc.addEventListener('click', click);
});

firstPromise
  .then((message) => {
    const successMessage = doc.createElement('div');

    successMessage.className = 'success';
    successMessage.textContent = message;
    successMessage.setAttribute('data-qa', 'notification');
    doc.body.append(successMessage);
  })
  .catch((error) => {
    const errorMessage = doc.createElement('div');

    errorMessage.className = 'error';
    errorMessage.setAttribute('data-qa', 'notification');
    errorMessage.textContent = error.message;
    doc.body.append(errorMessage);
  });
// -----------------------

const secondPromise = new Promise((resolve, reject) => {
  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  const successMessage = doc.createElement('div');

  successMessage.className = 'success';
  successMessage.textContent = message;
  successMessage.setAttribute('data-qa', 'notification');
  doc.body.append(successMessage);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

//  ---------------------

thirdPromise.then((message) => {
  const successMessage = doc.createElement('div');

  successMessage.className = 'success';
  successMessage.textContent = message;
  successMessage.setAttribute('data-qa', 'notification');
  doc.body.append(successMessage);
});
