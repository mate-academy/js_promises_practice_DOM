'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  let click = false;

  document.addEventListener('click', (e) => {
    if (!click) {
      click = true;
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (!click) {
      click = true;
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;
  let click = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick && !click) {
      click = true;
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick && !click) {
      click = true;
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((data) => {
    const successMessage = document.createElement('div');

    successMessage.textContent = data;
    successMessage.setAttribute('data-qa', 'notification');
    successMessage.classList.add('success');
    document.body.append(successMessage);
  })
  .catch((error) => {
    const errorMessage = document.createElement('div');

    errorMessage.textContent = error.message;
    errorMessage.setAttribute('data-qa', 'notification');
    errorMessage.classList.add('error');
    document.body.append(errorMessage);
  });

secondPromise
  .then((data) => {
    const successMessage = document.createElement('div');

    successMessage.textContent = data;
    successMessage.setAttribute('data-qa', 'notification');
    successMessage.classList.add('success');
    document.body.append(successMessage);
  })
  .catch((error) => {
    const errorMessage = document.createElement('div');

    errorMessage.textContent = error.message;
    errorMessage.setAttribute('data-qa', 'notification');
    errorMessage.classList.add('error');
    document.body.append(errorMessage);
  });

thirdPromise
  .then((data) => {
    const successMessage = document.createElement('div');

    successMessage.textContent = data;
    successMessage.setAttribute('data-qa', 'notification');
    successMessage.classList.add('success');
    document.body.append(successMessage);
  })
  .catch((error) => {
    const errorMessage = document.createElement('div');

    errorMessage.textContent = error.message;
    errorMessage.setAttribute('data-qa', 'notification');
    errorMessage.classList.add('error');
    document.body.append(errorMessage);
  });
