'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', () => {
    clicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');

    div.textContent = message;

    document.body.append(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.classList.add('error');
    div.setAttribute('data-qa', 'notification');

    div.textContent = error.message;

    document.body.append(div);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then((message) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');

    div.textContent = message;

    document.body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.classList.add('error');
    div.setAttribute('data-qa', 'notification');

    div.textContent = 'Second promise was rejected';

    document.body.append(div);
  });

const thirdPromise = new Promise((resolve) => {
  const pressedKeys = new Set();

  document.addEventListener('mousedown', (e) => {
    pressedKeys.add(e.button);

    if (pressedKeys.has(0) && pressedKeys.has(2)) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((message) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');

    div.textContent = message;

    document.body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.classList.add('error');
    div.setAttribute('data-qa', 'notification');

    div.textContent = 'Third promise was rejected';

    document.body.append(div);
  });
