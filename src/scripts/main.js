'use strict';

const doc = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  // eslint-disable-next-line no-shadow
  doc.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButtonPressed = false;
  let rightButtonPressed = false;

  // eslint-disable-next-line no-shadow
  doc.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      leftButtonPressed = true;
    }

    if (event.button === 2) {
      rightButtonPressed = true;
    }

    if (leftButtonPressed && rightButtonPressed) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((result) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.textContent = result;
    div.setAttribute('data-qa', 'notification');
    doc.appendChild(div);
  })
  .catch((result) => {
    const div = document.createElement('div');

    div.classList.add('error');
    div.textContent = result;
    div.setAttribute('data-qa', 'notification');
    doc.appendChild(div);
  });

secondPromise.then((result) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.textContent = result;
  div.setAttribute('data-qa', 'notification');
  doc.appendChild(div);
});

thirdPromise.then((result) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.textContent = result;
  div.setAttribute('data-qa', 'notification');
  doc.appendChild(div);
});
