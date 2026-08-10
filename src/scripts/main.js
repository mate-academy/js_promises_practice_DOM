'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
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

const thirdPromise = new Promise((resolve) => {
  let leftClickCount = false;
  let rightClickCount = false;

  document.addEventListener('click', () => {
    leftClickCount = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickCount = true;
    checkBothClicks();
  });

  function checkBothClicks() {
    if (leftClickCount && rightClickCount) {
      resolve('Third promise was resolved');
    }
  }
});

firstPromise.then(successMessage).catch(errorMessage);
secondPromise.then(successMessage).catch(errorMessage);
thirdPromise.then(successMessage).catch(errorMessage);

function successMessage(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;
  document.body.append(div);
}

function errorMessage(error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = error.message;
  document.body.append(div);
}
