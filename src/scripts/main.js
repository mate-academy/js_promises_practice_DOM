'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.textContent = message;

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');
    document.body.append(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.textContent = error.message;

    div.classList.add('error');
    div.setAttribute('data-qa', 'notification');
    document.body.append(div);
  });

secondPromise
  .then((message) => {
    const div = document.createElement('div');

    div.textContent = message;

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');
    document.body.append(div);
  })
  .catch();

thirdPromise
  .then((message) => {
    const div = document.createElement('div');

    div.textContent = message;

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');
    document.body.append(div);
  })
  .catch();
