'use strict';

function showMessage(message, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  if (isError) {
    div.classList.add('error');
  } else {
    div.classList.add('success');
  }

  div.textContent = message;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((response) => showMessage(response))
  .catch((error) => showMessage(error, true));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((response) => showMessage(response));

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });
});

thirdPromise.then((response) => {
  showMessage(response);
});
